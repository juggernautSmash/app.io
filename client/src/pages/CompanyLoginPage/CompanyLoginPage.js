import React from 'react'
import axios from 'axios'
import firebase from '../../firebase'
import LoginContext from '../../utils/LoginContext'
import CompanyLogin from '../../components/CompanyLogin'

const CompanyLoginPage = _ => {

  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
    loading: false,
    showPassword: false,
    errors: []
  })

  loginState.isLoginValid = ({ email, password }) => email && password

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
          console.log(signedInUser)
          loginState.addLocalStorage( 'fUser', signedInUser.user)
          axios.get(`/api/company/${signedInUser.user.uid}`)
            .then(data => {
              console.log(`here dat unique company ID:`)
              console.log(data)
              loginState.addLocalStorage( 'mUser', data)
            }).catch(e => console.log(e))
        })
        .catch(e => console.error(e))
    }
  }

  loginState.handleShowPassword = e => setLoginState({ ...loginState, showPassword: !loginState.showPassword })

  loginState.handleMouseDownPassword = e => e.preventDefault()

  return (
    <LoginContext.Provider value={loginState}>
      <CompanyLogin />
    </LoginContext.Provider>
  )
}

export default CompanyLoginPage