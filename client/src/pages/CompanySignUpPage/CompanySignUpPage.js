import React from 'react'
import axios from 'axios'
import CompanyForm from '../../components/CompanyForm'
import SignUpContext from '../../utils/SignUpContext'
import firebase from '../../utils/Auth'

const CompanySignUp = () => {

  const [signUpState, setSignUpState] = React.useState({
    email: '',
    phone: '',
    address: '',
    company: '',
    password: '',
    verifyPassword: '',
    errors: [],
    showPassword: false,
    isLoading: false
  })

  signUpState.isFormEmpty = ({ email, companyName, password, verifyPassword }) => {
    if (!email.length) {
      signUpState.logError({ message: 'Please enter the company email' })
      return true
    } else if (!companyName.length) {
      signUpState.logError({ message: 'Please enter the company name' })
      return true
    } else if (!password.length || !verifyPassword.length) {
      signUpState.logError({ message: 'Please enter a password' })
      return true
    } else {
      return false
    }
  }

  signUpState.logError = errorMessage => {
    let errors = JSON.parse(JSON.stringify(signUpState.errors))
    errors.push(errorMessage)
    setSignUpState({ ...signUpState, errors })
  }

  signUpState.isPasswordValid = ({ password, verifyPassword }) => {
    if (password.length < 8 || verifyPassword < 8) {
      signUpState.logError({ message: 'Password must contain 8 characters' })
      return false
    } else if (password !== verifyPassword) {
      signUpState.logError({ message: 'Passwords do not match' })
      return false
    } else {
      return true
    }
  }

  signUpState.isSignUpValid = () => {
    if (signUpState.isFormEmpty(signUpState)) {
      // error if the form is empty
      signUpState.logError({ message: 'Please fill in all required fields' })
      return false
    } else if (!signUpState.isPasswordValid(signUpState)) {
      // error if password is not valid
      return false
    } else {
      // form is valid
      return true
    }
  }

  signUpState.addLocalStorage = (key, value) => {
    console.log('add local storage loggin real good')
    localStorage.setItem(key, JSON.stringify(value))
  }

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })

  signUpState.handleShowPassword = e => setSignUpState({ ...signUpState, showPassword: !signUpState.showPassword })

  signUpState.handleMouseDownPassword = e => e.preventDefault()

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })

  signUpState.handleSubmitButton = e => {
    console.log('Submit button pressed')
    e.preventDefault()
    if (signUpState.isSignUpValid()) {
      setSignUpState({ ...signUpState, errors: [], isLoading: true })
      firebase.auth()
        .createUserWithEmailAndPassword(signUpState.email, signUpState.password)
        .then(createdUser => {
          console.log('firebase successful creating a comapny')
          console.log(createdUser)

          let company = {
            uid: createdUser.user.uid,
            name: signUpState.company,
            email: signUpState.email,
            phone: signUpState.phone,
            address: signUpState.address
          }

          signUpState.addLocalStorage( 'fCompany', createdUser.user)
          
          axios.post('/api/company', company)
          .then(mongoCompany => {
            console.log('company created in mongoDb')
            console.log(mongoCompany)

            signUpState.addLocalStorage( 'mCompany', mongoCompany)

          }).catch(e => console.log(e)) // catch from axios.post

          setSignUpState({ ...signUpState, loading: false })

        }).catch(e => { //catch from firebase
          console.log('catch from firebase')
          console.log(e)
          signUpState.logError(e)
          setSignUpState({ ...signUpState, isLoading: false })
        }) // end catch from firebase
    } // end if statement
    else {
      console.log('Error signing up')
      console.log(signUpState.errors)
    }
  }

  return (
    <SignUpContext.Provider value={signUpState}>
      <CompanyForm />
    </SignUpContext.Provider>
  )
}

export default CompanySignUp