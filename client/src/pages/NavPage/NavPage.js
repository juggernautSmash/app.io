import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import Context from '../../utils/Context'
import firebase from '../../utils/Auth'
import Loading from '../../components/Loading'

const NavPage = () => {

  const history = useHistory()

  const [state, setState] = React.useState({
    company: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    companyName: '',
    password: '',
    verifyPassword: '', 
    errors: [], // store errors
    showPassword: false, // to toggle if password is visible or not
    isLoading: false, // so we can display some loading animations
    isCompany: false, // so we can distinguish during sign up
  })

  // when you type something in the form it should get displayed and stored in the state
  state.handleInputChange = e => setState({ ...state, [e.target.name]: e.target.value})

  // display or hide password
  state.handleShowPassword = e => setState({ ...state, showPassword: !state.showPassword })

  // when you left/right click on the button
  state.handleMouseDownPassword = e => e.preventDefault()

  // when you click outside or move on to the next form entry check the entry
  state.handleBlur = e => state.validateForm(state)

  // store to localStorage
  state.addLocalStorage = async function (key, value) {
    console.log(`Putting key "${key}" in localStorage with value`, value)

    let storedItem = await new Promise( (resolve, reject) => {
      localStorage.setItem(key, JSON.stringify(value))
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  // get item from localSotrage
  state.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  // update the error state
  state.logError = errorMessage => {
    let errors = JSON.parse(JSON.stringify(state.errors))
    errors.push(errorMessage)
    setState({ ...state, errors })
  } // end logError

  // output a <p> per error
  state.displayError = errors => errors.map((error, i) => <span key={i}>{error.message}</span>)

  // empty the state.errors array
  state.clearErrors = _ => setState({ ...state, errors: []})

  // check for if the entries for email and password are valid fr signing up
  state.validateForm = ({email, password, verifyPassword}) => {  
    // This function is used for the validating the data in the sign up form
    if (!email) {
      // check if there is an email entry
      state.logError({ message:  "Email required" })
      return false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      // check if the email is in the format email@email.com
      state.logError({ message: "Invalid email address" })
      return false
    } else if (!password){
      // check if there is a password entry
      state.logError({ message:  "Password required" })
      return false
    } else if (password.length < 8){
      // check if the password is more than 8 characters
      state.logError({ message:  "Password must be at least 8 characters" })
      return false
    } else if (password !== verifyPassword) {
      // check if the password matches the entry in verifyPassword
      state.logError({ message: "Please verify your password"})
      return false
    } else {
      // if all entries are valid, the form is validated
      return true
    } // end else
  } // end validateForm

  // check for if the entries for email and password are valid for login
  state.validateLogin = ({ email, password }) => {
    // This function is used for validating the data in the login form
    if (!email) {
      // check if there is an email entry
      state.logError({ message:  "Email required" })
      return false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      // check if the email is in the format email@email.com
      state.logError({ message: "Invalid email address" })
      return false
    } else if (!password) {
      // check if there is a password entry
      state.logError({ message: "Password required" })
      return false
    } else if (password.length < 8) {
      // check if the password is more than 8 characters
      state.logError({ message: "Password must be at least 8 characters" })
      return false
    } else {
      // if all entries are valid, the log is good.
      return true
    } // end else
  } // end validateLogin

  // handler for the submit button in the signup page
  state.handleSubmitUserSignUp = async function (e) {
    e.preventDefault()
    if (state.validateForm(state)){
      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setState({ ...state, errors: [], isLoading: true })
     
      // register user using firebase
      firebase.register(state.email, state.password)
        .then( uid => {

          // store uid in localStorage
         state.addLocalStorage('uid', uid)
          .then( userId => {
            console.log('addLocalStorage promise is...', userId)
          // store sign up info in mongo
          axios.post(`/api/user`, {
            uid: uid,
            title: state.title,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            phone: state.phone,
            location: state.location,
            company: state.company
          })
            //store user data from DB in localStorage
            .then( ({data}) => {
                console.log('data from axios is...', data)
                state.addLocalStorage('user', data)
                  .then( r => console.log('user stored in localStorage is ', r))
                  .catch( e => console.error(e))
                // state.addLocalStorage('boards', data.board)
                //   .then( r => console.log('user stored in localStorage is ', r))
                //   .catch( e => console.error(e))
                state.addLocalStorage('company', data.company)
                  .then( r => console.log('user stored in localStorage is ', r))
                  .catch( e => console.error(e))
                // create boards
                state.createBoards()
                  .then( boards => console.log('boards created...', boards))
                  .catch( e => console.error('error creating boards...', e))
              })
            // if getting the user from DB fails log the error
            .catch( e => console.error('Error posting to DB', e))
          }) // end addLocalStorage.then

            // after logging in, delay five seconds for everything to sync
            setTimeout( ()=>{        
              
              // and set the state to false to exit the loading page
              setState({ ...state, isLoading: false })

              // redirect to the boards page
              history.push('/boards')
            
            }, 3000 ) // end setTimeout

        }) // end firebase.register.then
        // if firebase fails to sign up the user.
        .catch( error => state.logError(error))
    } // end if statement
    else {
      // if sign up form is not valid set isLoading so you can resumbit
      setState({ ...state, isLoading: false })
    }
  } // handleSubmitUserSignUp

  state.handleSubmitCompanySignUp = async function (e) {
    e.preventDefault()
    if (state.validateForm(state)){
      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setState({ ...state, errors: [], isLoading: true })
     
      // register user using firebase
      firebase.register(state.email, state.password)
        .then( uid => {

          // store uid in localStorage
         state.addLocalStorage('uid', uid)
          .then( userId => {
            console.log('addLocalStorage promise is...', userId)
          // store sign up info in mongo
          axios.post(`/api/company`, {
            uid: uid,
            email: state.email,
            phone: state.phone,
            address: state.address,
            companyName: state.companyName
          })
            //store user data from DB in localStorage
            .then( ({data}) => {
                console.log('data from axios is...', data)
                state.addLocalStorage('user', data)
                  .then( r => console.log('user stored in localStorage is ', data))
                  .catch( e => console.error(e))
                state.addLocalStorage('board', data.board)
                  .then( r => console.log('user stored in localStorage is ', data))
                  .catch( e => console.error(e))
              })
            // if getting the user from DB fails log the error
            .catch( e => console.error('Error posting to DB', e))
          }) // end addLocalStorage.then

            // after logging in, delay five seconds for everything to sync
            setTimeout( ()=>{        
              
              // and set the state to false to exit the loading page
              setState({ ...state, isLoading: false })

              // redirect to the company page
              history.push('/company')
            
            }, 5000 ) // end setTimeout

        }) // end firebase.register.then
        // if firebase fails to sign up the user.
        .catch( error => state.logError(error))
    } // end if statement
    else {
      // if sign up form is not valid set isLoading so you can resumbit
      setState({ ...state, isLoading: false })
    }
  } // handleSubmitCompanySignUp

    // handler for the submit button in the login page
  state.handleSubmitUserLogin = e => {
    console.log('submit user login pressed')
    e.preventDefault()
    if (state.validateLogin(state)){
      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setState({ ...state, errors: [], isLoading: true })
      
      // log in user using firebase
      firebase.login(state.email, state.password)
        .then( uid => {
          state.addLocalStorage('uid', uid)
            .then( storedId => {
              console.log('success pushing uid to storage', storedId)
              // get user from DB
              axios.get(`/api/user/${uid}`)
              // store user from DB to localStorage
                .then( ({ data }) => {
                // console.log('data from axios is...', data)
                state.addLocalStorage('user', data)
                  .then( r => console.log('data stored', r) )
                  .catch( e => console.error(e) )
                state.addLocalStorage('boards', data.boards)
                  .then( r => console.log('boards stored', r))
                }) // end axios.get.then
              // if getting the user from DB fails log the error
              .catch( e => console.error( 'Error retrieving from DB', e ) )
              //end axios
            })
            .catch( e => console.error(e) )
            // end addLocalStorage
        
        // after logging in, delay three seconds for everything to sync
        setTimeout( ()=> {        
          
          // after five seconds, redirect to the boards page
          history.push('/boards')

          // and set the state to false to exit the loading page
          setState({ ...state, isLoading: false })
        
        }, 5000 ) // end setTimeout

        }) // end firebase.login.then
        // if firebase fails to login the user.
        .catch( error => state.logError( error ) )

    } // end if statement
    else {
      // if sign up form is not valid set isLoading so you can resumbit
      console.log('validate login fail')
      setState({ ...state, isLoading: false })
    }
  } //handleSubmitLogin

  state.handleSubmitCompanyLogin = e => {
    console.log('submit user login pressed')
    e.preventDefault()
    if (state.validateLogin(state)){
      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setState({ ...state, errors: [], isLoading: true })
      
      // log in user using firebase
      firebase.login(state.email, state.password)
        .then( uid => {
          state.addLocalStorage('uid', uid)
            .then( storedId => {
              console.log('success pushing uid to storage', storedId)
              // get user from DB
              axios.get(`/api/company/${uid}`)
              // store user from DB to localStorage
                .then( ({ data }) => {
                // console.log('data from axios is...', data)
                state.addLocalStorage('user', data)
                  .then( r => console.log('data stored', r) )
                  .catch( e => console.error(e) )
                }) // end axios.get.then
              // if getting the user from DB fails log the error
              .catch( e => console.error( 'Error retrieving from DB', e ) )
              //end axios
            })
            .catch( e => console.error(e) )
            // end addLocalStorage
        
        // after logging in, delay three seconds for everything to sync
        setTimeout( ()=> {        
          
          // after five seconds, redirect to the boards page
          history.push('/company')

          // and set the state to false to exit the loading page
          setState({ ...state, isLoading: false })
        
        }, 3000 ) // end setTimeout

        }) // end firebase.login.then
        // if firebase fails to login the user.
        .catch( error => state.logError( error ) )

    } // end if statement
    else {
      // if sign up form is not valid set isLoading so you can resumbit
      console.log('validate login fail')
      setState({ ...state, isLoading: false })
    }
  } //handleSubmitCompanyLogin

  // handler for logout button to logout and clear the local storage
  state.logout = _ => {
    setState({ ...state, isLoading: true })
    console.log('logging out')
    localStorage.removeItem('uid') // remove uid from localStorage
    localStorage.removeItem('user') // remove user data from localStorage
    localStorage.removeItem('boards') // remove board data form localStorage
    localStorage.removeItem('company') // remove company data from localStorage
    history.push('/') // redirect to landing page after logout
    firebase.logout()
    setTimeout( () => setState({ ...state, isLoading: false }), 3000)
  }

  state.createBoards = async function () {
    // console.log('creating boards')

    const boards = new Promise( (resolve, reject) => {

      let boardsCreated = []
      let board_ids = []
      // get the user _id from the localStorage
      state.getLocalStorageItem('user')
        .then( user => {
          // console.log('createBoards for user...', user._id)

          // create 3 boards after sign up
          for( let i = 0; i<3 ; i++){
            // for cleaner code, set the req.body to a variable
            const boardPayload = {
              owner: user._id,
              title: `Board ${i}`
            }
            
            axios.post(`/api/boards`, boardPayload)
            .then( ({data}) => {
              // console.log('axios board post is hit. Created board', data)
              boardsCreated.push(boardPayload)
              board_ids.push(data._id)
              // let boardList = JSON.parse(localStorage.getItem('boards'))
              state.addLocalStorage('boards', board_ids)
              .then( boardList => {
                // console.log('added the following boards in storage', boardList)

                for( let j = 0; j<3 ; j++){
                  const tablePayload ={
                    title: `Table ${j}`,
                    board: data._id,
                    owner: user._id
                  }
                  // create tables
                  axios.post('/api/tables', tablePayload)
                    .then( r => {
                      console.log('successfully generated table')
                    })
                    .catch( e => console.error('error generating tables ', e))
                }
              })
              .catch( e => console.error('error storing boards in storage', e))
            })
            .catch( e => console.error('createBoards: error posting boards', e))
          } // end for loop
        })
        .catch( e => console.log('createBoards: error getting uid', e))

      boardsCreated ? resolve(boardsCreated) : reject(new Error('no boards were added'))
    })


    return boards
  } // end createBoards

  // React.useEffect( () => {
  //   console.log('this is the history in navpage', history)
  // }, [])
  
  return (
    <Context.Provider value={state}>
      <NavBar />
      { 
        state.isLoading ? <Loading /> : null 
      }
    </Context.Provider>
  )
}

export default NavPage