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
    errors: [],
    showPassword: false,
    isLoading: false
  })

  signUpState.isFormEmpty = ({ email, firstName, lastName, password, verifyPassword }) => {
    return !email.length || !firstName.length || !lastName.length || !password.length || !verifyPassword.length 
  }

  signUpState.logError = errorMessage => {
    let errors =  JSON.parse(JSON.stringify(signUpState.errors))
    errors.push(errorMessage)
    setSignUpState({ ...signUpState, errors})
  }

  signUpState.isPasswordValid = ({password, verifyPassword}) => {
    if(password.length < 8 || verifyPassword < 8){
      signUpState.logError({ message: 'Password must contain 8 characters'})
      return false
    } else if(password !== verifyPassword){
      signUpState.logError({ message: 'Passwords do not match'})
      return false
    } else {
      return true
    }
  }

  signUpState.isSignUpValid = () => {
    if(signUpState.isFormEmpty(signUpState)){
      // error if the form is empty
      signUpState.logError({ message: 'Please fill in all required fields' })
      return false
    } else if (!signUpState.isPasswordValid(signUpState)){
      // error if password is not valid
      return false
    } else {
      // form is valid
      return true 
    }
  }

  signUpState.addLocalStorage = user => {
    console.log('add local storage loggin real good')
  }

  signUpState.handleShowPassword = e => setSignUpState({ ...signUpState, showPassword: !signUpState.showPassword})

  signUpState.handleMouseDownPassword = e => e.preventDefault()

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })
  
  signUpState.handleSubmitButton = e => {
    console.log('Submit button pressed')
    e.preventDefault()
    if(signUpState.isSignUpValid()){
      setSignUpState({ ...signUpState, errors: [], isLoading: true})
      firebase.auth()
        .createUserWithEmailAndPassword(signUpState.email, signUpState.password)
        .then( createdUser => {
          console.log('successfully created user in firebase')
          console.log(createdUser)
          signUpState.addLocalStorage(createdUser)
          setSignUpState({ ...signUpState, loading: false})
          axios.post('/api/user', {
            title: signUpState.title,
            firstName: signUpState.firstName,
            lastName: signUpState.lastName,
            email: signUpState.email,
            phone: signUpState.phone,
            location: signUpState.location,
            companyName: signUpState.companyName
          }).then( user => { // then from axios post
            console.log('user created in mongoDb')
            console.log(user)
          }).catch( e => console.error(e)) //catch from axios.post
        }).catch( e => { // catch from firebase
          console.log(e)
          signUpState.logError(e)
          setSignUpState({ ...signUpState, isLoading: false})
        }) // end catch from firebase
    } // end if statement
    else {
      console.log('Error signing up')
      console.log(signUpState.errors)
    }
  }

  return (
    <SignUpContext.Provider value={signUpState}>
      <UserForm />
    </SignUpContext.Provider>
  )
}

export default UserSignUpPage