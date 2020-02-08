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
    openModal: true, 
  })

  // when you type something in the form it should get displayed and stored in the state
  state.handleInputChange = e => setState({ ...state, [e.target.name]: e.target.value})

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

  // state.validateBoard = title => {
  //   if(!title){
  //     state.logError({ message: 'Please enter a title'})
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  state.handleSubmitBoard = e => {
    e.preventDefault()
    if(state.title){ // if title has an entry let the push happen
      setState({ ...state, isLoading: true}) // so we can disable the submit button after it is pressed once.

      // get the user _id from the localStorage
      const user = JSON.parse(localStorage.getItem('user'))._id

      // for cleaner code, set the req.body to a variable
      const payload = {
        user,
        title: state.title,
        description: state.description
      }

      // post the created board in mongo
      axios.post(`/api/boards`, payload)
        .then( ({data}) => {
          // console.log('axios board post is hit', data)
          let boardList = JSON.parse(localStorage.getItem('board'))
          boardList.push(data._id)
          state.addLocalStorage('board', boardList)
          setState({ ...state, isLoading: false, openModal: false}) // so we can disable the submit button after it is pressed once.
        })
        .catch( e => console.error(e))
    } else {
      state.logError({ message: 'Please enter a title'})
    }
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