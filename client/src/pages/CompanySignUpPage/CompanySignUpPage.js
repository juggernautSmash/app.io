import React from 'react'
import axios from 'axios'
import CompanyForm from '../../components/CompanyForm'
import SignUpContext from '../../utils/SignUpContext'
import firebase from '../../firebase.js'

const CompanySignUp = () => {

  const [ signUpState, setSignUpState ] = React.useState({
    email: '',
    phone: '',
    address: '',
    companyName: '',
    password: '',
    verifyPassword: '',
    errors: [],
    showPassword: false,
    isLoading: false
  })

  signUpState.isFormEmpty = ({email, companyName, password, verifyPassword}) => {
    if(!email.length){
        signUpState.logError('Please enter the company email')
        return true
    } else if(!companyName.length){
        signUpState.logError('Please enter the company name')
        return true
    } else if(!password.length || !verifyPassword.length){
        signUpState.logError('Please enter a password')
        return true
    } else {
        return false
    }

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

  signUpState.logError = errorMessage => {
    let errors =  JSON.parse(JSON.stringify(signUpState.errors))
    errors.push({message: errorMessage})
    setSignUpState({ ...signUpState, errors})
  }

  signUpState.isPasswordValid = ({password, verifyPassword}) => {
    if(password.length < 8 || verifyPassword < 8){
      signUpState.logError('Password must contain 8 characters')
      return false
    } else if(password !== verifyPassword){
      signUpState.logError('Passwords do not match')
      return false
    } else {
      return true
    }
  }

  signUpState.isSignUpValid = () => {
    if(signUpState.isFormEmpty(signUpState)){
      // error if the form is empty
      signUpState.logError('Please fill in all required fields')
      return false
    } else if (!signUpState.isPasswordValid(signUpState)){
      // error if password is not valid
      signUpState.logError('Password is invalid')
      return false
    } else {
      // form is valid
      return true 
    }
  }

  signUpState.addLocalStorage = company => {
    console.log('add local storage loggin real good')
  }

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })

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
          console.log(createdUser)
          signUpState.addLocalStorage(createdUser)
          setSignUpState({ ...signUpState, loading: false})
          axios.post('/api/company', {
            name: signUpState.name,
            email: signUpState.email,
            phone: signUpState.phone,
            address: signUpState.address
          }).then( mongoCompany => {
            console.log('company created in mongoDb')
            console.log(mongoCompany)
          }).catch( e => console.log(e)) // catch from axios.post
        }).catch( e => { //catch from firebase
          console.log(e)
          setSignUpState({ ...signUpState, errors: e, isLoading: false})
        })
    }
  }

  return (
    <SignUpContext.Provider value={signUpState}>
      <CompanyForm />
    </SignUpContext.Provider>
  )
}

export default CompanySignUp