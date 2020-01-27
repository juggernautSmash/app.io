import React from 'react'
import axios from 'axios'
import SignUpContext from '../../utils/SignUpContext'
import UserForm from '../../components/UserForm'
import firebase from '../../firebase.js'

const UserSignUpPage = () => {


  const [ signUpState, setSignUpState ] = React.useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    companyName: '',
    password: '',
    verifyPassword: '',
    showPassword: false,
    errors: [],
    isLoading: false
  })

  signUpState.isFormEmpty = ({email, firstName, lastName, password, verifyPassword}) => {
    console.log(`
    ${email.length}`)
    return !email.length || !firstName.length || !lastName.length || !password.length || !verifyPassword.length 
  }

  signUpState.isPasswordValid = ({password, verifyPassword}) => {
    if(password.length < 8 || verifyPassword < 8){
      return false
    } else if(password !== verifyPassword){
      return false
    } else {
      return true
    }
  }

  signUpState.isSignUpValid = () => {
    let error;
    if(signUpState.isFormEmpty(signUpState)){
      // error if the form is empty
      error = { message: "Please fill in all required fields"}
      setSignUpState({ ...signUpState, errors: error})
      return false

    } else if (!signUpState.isPasswordValid(signUpState)){
      // error if password is not valid
      error = { message: "Password is invalid"}
      setSignUpState({ ...signUpState, errors: error})
    } else {
      // form is valid
      return true 
    }
  }

  signUpState.handleShowPassword = e => setSignUpState({ ...signUpState, showPassword: !signUpState.showPassword})

  signUpState.handleMouseDownPassword = e => e.preventDefault()

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })
  
  signUpState.handleSubmitButton = e => {
    e.preventDefault()
    if(signUpState.isSignUpValid()){
      setSignUpState({ ...signUpState, errors: [], isLoading: true})
      firebase.auth()
        .createUserWithEmailAndPassword(signUpState.email, signUpState.password)
        .then( createdUser => {
          console.log(createdUser)
          setSignUpState({ ...signUpState, loading: false})
        })
        .catch( e => {
          console.log(e)
          setSignUpState({ ...signUpState, errors: e, isLoading: false})
        })
      axios.post('/api/user', {
        title: signUpState.title,
        firstName: signUpState.firstName,
        lastName: signUpState.lastName,
        email: signUpState.email,
        phone: signUpState.phone,
        location: signUpState.location,
        companyName: signUpState.companyName
      })
      .then( user => {
        console.log(user)
      })
      .catch( e => console.error(e))
    }
    console.log('Submit button pressed')
  }

  return (
    <SignUpContext.Provider value={signUpState}>
      <UserForm />
    </SignUpContext.Provider>
  )
}

export default UserSignUpPage