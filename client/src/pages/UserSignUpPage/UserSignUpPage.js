import React from 'react'
import axios from 'axios'
import SignUpContext from '../../utils/SignUpContext'
import UserForm from '../../components/UserForm'
import firebase from '../../utils/Auth'


const UserSignUpPage = (props) => {

  const [signUpState, setSignUpState] = React.useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    password: '',
    verifyPassword: '', 
    errors: [], // store errors
    showPassword: false, // to toggle if password is visible or not
    isLoading: false // so we can display some loading animations
  })

  signUpState.isFormEmpty = ({ email, firstName, lastName, password, verifyPassword }) => {
    return !email.length || !firstName.length || !lastName.length || !password.length || !verifyPassword.length
  } //end isFormEmpty

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
    //console.log('add local storage loggin real good')
    localStorage.setItem(key, JSON.stringify(value))
  }

  signUpState.handleShowPassword = e => setSignUpState({ ...signUpState, showPassword: !signUpState.showPassword })

  signUpState.handleMouseDownPassword = e => e.preventDefault()

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })

  signUpState.handleSubmitButton = e => {
    console.log('Submit button pressed')
    console.log(e)
    e.preventDefault()
    if (signUpState.isSignUpValid()) {

      // Clear the errors and set the isLoading to true to prevent the user from double-clicking the submit button
      setSignUpState({ ...signUpState, errors: [], isLoading: true })

      firebase.auth()
        .createUserWithEmailAndPassword(signUpState.email, signUpState.password)
        .then(createdUser => {
          // console.log('firebase successful creating a user')
          // console.log('successfully created user in firebase')
          // console.log(createdUser)

          // set all the user input on the form to an object for easier usage
          let user = {
            uid: createdUser.user.uid,
            title: signUpState.title ? signUpState.title : '',
            firstName: signUpState.firstName,
            lastName: signUpState.lastName,
            email: signUpState.email,
            phone: signUpState.phone ? signUpState.phone : '',
            location: signUpState.location ? signUpState.location : '',
            company: signUpState.companyName 
          }

          // push firebase user info to the local storage
          signUpState.addLocalStorage("fUser", createdUser.user)

          axios.post('/api/user', user)
          .then( ({data}) => { // then from axios post
            // console.log('user created in mongoDb')
            // console.log(data)
            
            // push mongoDb user to the local storage
            signUpState.addLocalStorage('mUser', data)
          }).catch(e => console.error(e)) //catch from axios.post

          //make the submit button clickable again
          setSignUpState({ ...signUpState, isLoading: false })

        }).catch(e => { // catch from firebase
          console.log('catch from firebase')
          console.log(e)
          signUpState.logError(e)

          //make the submit button clickable again
          setSignUpState({ ...signUpState, isLoading: false })
        }) // end catch from firebase

        // After signing up, redirect to user profile
        while(!localStorage.getItem('mUser')){
          console.log('processing localStorage')
        }
        props.history.push('/userprofile')

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