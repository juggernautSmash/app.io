import React from 'react'
import axios from 'axios'
import firebase from '../../firebase'
import LoginContext from '../../utils/LoginContext'
import UserLogin from '../../components/UserLogin'

const UserLoginPage = _ => {

  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
    loading: false,
    showPassword: false,
    errors: []
  })

  loginState.isLoginValid = ({ email, password }) => email && password

  loginState.handleInputChange = e => setLoginState({ ...loginState, [e.target.name]: e.target.value })

  loginState.addLocalStorage = user => {
    localStorage.setItem("user", JSON.stringify(user))
  }

  loginState.handleSubmitButton = e => {
    e.preventDefault()
    if (loginState.isLoginValid(loginState)) {
      setLoginState({ ...loginState, errors: [], loading: true })
      firebase.auth()
        .signInWithEmailAndPassword(loginState.email, loginState.password)
        .then(signedInUser => {
          console.log(signedInUser)
          loginState.addLocalStorage(signedInUser.user)
          axios.get(`/api/user/${signedInUser.user.uid}`)
            .then(data => {
              console.log(`here dat unique user ID:`)
              console.log(data)
            }).catch(e => console.log(e))
        })
        .catch(e => console.error(e))
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