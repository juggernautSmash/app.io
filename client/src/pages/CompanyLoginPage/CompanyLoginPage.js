import React from 'react'
import firebase from '../../firebase'
import LoginContext from '../../utils/LoginContext'
import CompanyLogin from '../../components/CompanyLogin'

const CompanyLoginPage = _ => {

  const [ loginState, setLoginState ] = React.useState({
    email: '',
    password: '',
    loading: false,
    showPassword: false,
    errors: []
  })

  loginState.isLoginValid = ({ email, password }) => email && password

  loginState.handleInputChange = e => setLoginState({ ...loginState, [e.target.name]: e.target.value })

  loginState.handleSubmitButton = e => {
    e.preventDefault()
    if(loginState.isLoginValid(loginState)){
      setLoginState({ ...loginState, errors: [], loading: true})
      firebase.auth()
        .signInWithEmailAndPassword(loginState.email, loginState.password)
        .then( signedInUser => {
          console.log(signedInUser)
        })
        .catch( e => console.error(e))
    }
  }

  loginState.handleShowPassword = e => setLoginState({ ...loginState, showPassword: !loginState.showPassword})

  loginState.handleMouseDownPassword = e => e.preventDefault()

  return (
    <LoginContext.Provider value={loginState}>
      <CompanyLogin />
    </LoginContext.Provider>
  )
}

export default CompanyLoginPage