import React from 'react'
import axios from 'axios'
import BottomBar from '../../components/BottomBar'
import { FirebaseContext } from '../../utils/Auth'
import BottomBarContext from '../../utils/BottomBarContext'

const BottomBarPage = props => {

  const { user } = React.useContext(FirebaseContext)

  const [ state, setState ] = React.useState({
    id: '',
    title: '',
    description: '',
    errors: [],
    isLoading: false,
    isSuccess: false
  })

  // when you type something in the form it should get displayed and stored in the state
  state.handleInputChange = e => setState({ ...state, [e.target.name]: e.target.value})

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

  //get date from localStorage
  state.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  //update localStorage
  state.updateLocalStorageItem = async function (key,value) {
    console.log(`updating storage for ${key} with value`, value)
    let storedItem = await new Promise( (resolve, reject) => {
      state.getLocalStorageItem(key)
        .then( item => {
          item.push(value)
          state.addLocalStorage(key, item)
            .then( r => {
              console.log(`updating storage for ${key} with value`, r)
              item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
            })
            .catch( e => console.error(`error updating storage for ${key}`, e))
        })
        .catch( e => console.error(`error updating storage for ${key}`))

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
   state.displayError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  state.handleSubmitBoard = e => {
    console.log('submit board pressed')
    e.preventDefault()
    if(state.title){ // if title has an entry let the push happen
      setState({ ...state, isLoading: true}) // so we can disable the submit button after it is pressed once.

      // get the user _id from the localStorage
      state.getLocalStorageItem('user')
        .then( ({_id}) => {

          // for cleaner code, set the req.body to a variable
          const payload = {
            owner: _id,
            title: state.title,
            description: state.description
          }

          // post the created board in mongo
          axios.post(`/api/boards`, payload)
            .then( ({data}) => {

              console.log('board created is...', data)
              state.updateLocalStorageItem('boards', data._id)
                .then( newBoards => console.log('successful updating boards in storage', newBoards))
                .catch( e => console.error('error updating boards in storage', e))
                state.createTable(data._id)
            })
            .catch( e => console.error('error posting new board', e))
        })
        .catch( e => console.error('error getting user from storage', e))
    } else {
      state.logError({ message: 'Please enter a title'})
    }
  }

  state.createTable = boardId => {
    console.log('running create table for board# ', boardId)

    const newTable = {
      board: boardId,
      title: "New Table"
    }

    axios.post(`/api/tables`, newTable)
      .then( r => {
        console.log('successfully created table', r)

        // generate tasks in the table
        for( let k = 0; k<3 ; k++ ){
          const taskPayload = {
            table: r.data._id,
            task: `New Task #${k}`
          }

          axios.post('/api/task', taskPayload)
            .then( r => {
              console.log('successfully added task to table')
            })
            .catch( e => console.error('error posting tasks to table', e))
        } // end for loop generating tasks
      })
      .catch( e => console.error('error posting table to the database', e))

  }

  // React.useEffect( () => {
  //   const id = JSON.parse(localStorage.getItem('user'))._id
  //   setState({ ...state, mongoId: id})

  //   setTimeout( () => console.log('the mongoId is...', state.mongoId), 3000)
    
  // }, [])

  return (
    <BottomBarContext.Provider value={state}>
    {user ? <BottomBar {...props}/> : null}
    </BottomBarContext.Provider>
  )
}

export default BottomBarPage