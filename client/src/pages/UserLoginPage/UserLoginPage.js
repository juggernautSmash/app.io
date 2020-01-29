import React from 'react'
import axios from 'axios'
import firebase from '../../firebase'
import LoginContext from '../../utils/LoginContext'
import UserLogin from '../../components/UserLogin'

const UserLoginPage = _ => {

  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
    errors: [],
    loading: false,
    showPassword: false
  })

  loginState.logError = errorMessage => {
    console.log('running logError')
    console.log(errorMessage)
    let errors = JSON.parse(JSON.stringify(loginState.errors))
    errors.push(errorMessage)
    setLoginState({ ...loginState, errors })
    console.log(loginState.errors)
  }

  loginState.isLoginValid = ({ email, password }) =>  (email && password) ? true : loginState.logError({ message: 'Please enter email and/or password'})

  loginState.handleInputChange = e => setLoginState({ ...loginState, [e.target.name]: e.target.value })

  loginState.addLocalStorage = (key, value) => {
    console.log('add local storage loggin real good')
    localStorage.setItem(key, JSON.stringify(value))
  }

  loginState.handleSubmitButton = e => {
    e.preventDefault()
    if (loginState.isLoginValid(loginState)) {
      setLoginState({ ...loginState, errors: [], loading: true })
      firebase.auth()
        .signInWithEmailAndPassword(loginState.email, loginState.password)
        .then(signedInUser => {
          console.log('sign in successful!')
          console.log(signedInUser)
          loginState.addLocalStorage( 'fUser', signedInUser.user)
          axios.get(`/api/user/${signedInUser.user.uid}`)
            .then(data => {
              console.log(`here dat unique user ID:`)
              console.log(data)
              // Store data from mongoDb to localStorage
              loginState.addLocalStorage( 'mUser', data)
            }).catch(e => console.log(e)) // axios catch

        }) // end firebase .then
        .catch(e => { // firebase .catch
          console.log('Error logging in')
          console.error(e)
          loginState.logError(e)
        }) // end firebase .catch
    } // end if
    else {
      console.log('Error logging in')
      loginState.logError({ message: 'Error logging in' })
      console.log(loginState.errors)
    }
  }

  loginState.handleShowPassword = e => setLoginState({ ...loginState, showPassword: !loginState.showPassword })

  loginState.handleMouseDownPassword = e => e.preventDefault()

  return (
    <LoginContext.Provider value={loginState}>
      <UserLogin />
    </LoginContext.Provider>
  )
}

export default UserLoginPage