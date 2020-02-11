import React from 'react'

const Context = React.createContext({
  uid:'', // uid from firebase for logging in
  photoUrl: '',
  title: '', // title of user
  photo: '', // photo url of user or company
  firstName: '', // first name of user
  lastName: '', // last name of user
  name: '', // comany name
  email: '', // email of user or company
  phone: '', // phone number of user or company
  address: '', // address of user or company
  password: '', // pass of user or company
  timezone: '', // timezone of user
  company: '',
  companyName: '',
  photoUrl: '', // url for the user photo
  showPassword: '', // Boolean to show or hide password
  isLoading: '', // Boolean to determine if a pages is loading
  isCompany: '', // Boolean to determine if signup/login is a user/company
  errors: [], // errors array for getting errors
  employees: [], //array for getting employees names
  handleBur: () => {}, // when you click outside or move on to the next form entry check the entry
  handleInputChange: () => {}, // when you type something in the form it should get displayed and stored in the state
  handleSubmitButton: () => {}, // right now, it's a placeholder
  handleShowPassword: () => {}, // display or hide password
  handleSubmitUserSignUp: () => {},  // handler for the submit button in the signup page for User
  handleSubmitCompanySignUp: () => {},  // handler for the submit button in the signup page for Company
  handleSubmitUserLogin: () => {},   // handler for the submit button for User the login page
  handleSubmitCompanyLogin: () => {}, // handler for the submit button for Company the login page
  handlePhotoUrl: () => {},
  handleFileUpload: () => {},
  handleImageUpload: () => {},
  handleMouseDownPassword: () => {},  // when you left/right click on the button prevent default
  displayError: () => {}, // output a <p> per error
  logErrors: () => {}, // update the error state
  clearErrors: () => {}, // empty the state.errors array
  // isLoginValid: () => {}, 
  addLocalStorage: () => {}, // store to localStorage
  getEmployees: () => {}, // get employees related to the company
  getProfile: () => {}, // get user info
  logout: () => {}, // handler for logout button to logout and clear the local storage

})

export default Context