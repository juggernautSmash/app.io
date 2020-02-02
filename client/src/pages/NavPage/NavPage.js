import React from 'react'
import axios from 'axios'
import NavBar from '../../components/NavBar'
import Context from '../../utils/Context'
import firebase from '../../utils/Auth'


const NavPage = props => {

  const [state, setState] = React.useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    name: '',
    password: '',
    verifyPassword: '', 
    errors: [], // store errors
    showPassword: false, // to toggle if password is visible or not
    isLoading: false // so we can display some loading animations
  })

  // when you type something in the form it should get displayed
  state.handleInputChange = e => setState({ ...state, [e.target.name]: e.target.value})

  state.handleShowPassword = e => setState({ ...state, showPassword: !state.showPassword })

  // when you left/right click on the button
  state.handleMouseDownPassword = e => e.preventDefault()

  // when you click outside or move on to the next form entry check the entry
  state.handleBlur = e => state.validateForm(state)

  // store to localStorage
  state.addLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  // update the error state
  state.logError = errorMessage => {
    let errors = JSON.parse(JSON.stringify(state.errors))
    errors.push(errorMessage)
    setState({ ...state, errors })
  } // end logError

  // output a <p> per error
  state.displayError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  // empty the state.errors array
  state.clearErrors = _ => setState({ ...state, errors: []})

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

  state.handleSubmitSignUp = e => {
    e.preventDefault()
    if (state.validateForm(state)){
      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setState({ ...state, errors: [], isLoading: true })
      
      // register user using firebase
      firebase.register(state.email, state.password)
        .then( uid => {

          // store uid in localStorage
          localStorage.setItem('uid', uid)

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
              })
            // if getting the user from DB fails log the error
            .catch( e => console.error('Error posting to DB', e))

        })
        // if firebase fails to sign up the user.
        .catch( error => state.logError(error))
    } // end if statement
    else {
      // if sign up form is not valid set isLoading so you can resumbit
      setState({ ...state, isLoading: false })
    }
  } // handleSubmitSignUp

  state.handleSubmitLogin = e => {
    console.log('submit login pressed')
    e.preventDefault()
    if (state.validateLogin(state)){
      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setState({ ...state, errors: [], isLoading: true })
      
      // log in user using firebase
      firebase.login(state.email, state.password)
        .then( uid => {

        // store uid in localStorage
        localStorage.setItem('uid', uid)
        
        // get user from DB
        axios.get(`/api/user/${uid}`)
          // store user from DB to localStorage
          .then( ({ data }) => {
            console.log('data from axios is...', data)
            state.addLocalStorage('user', data)
          })
          // if getting the user from DB fails log the error
          .catch( e => console.error('Error retrieving from DB', e))
        })
        // if firebase fails to login the user.
        .catch( error => state.logError(error))

        setTimeout(()=>console.log('delay 5 secs'), 5000)
    } // end if statement
    else {
      // if sign up form is not valid set isLoading so you can resumbit
      console.log('validate login fail')
      setState({ ...state, isLoading: false })
    }
  } //handleSubmitLogin

  state.logout = _ => {
    console.log('logging out')
    localStorage.removeItem('uid') // remove uid from localStorage
    localStorage.removeItem('user') // remove user date from localStorage
    firebase.logout()
  }
  
  return (
    <Context.Provider value={state}>
      <NavBar />
    </Context.Provider>
  )
}

export default NavPage