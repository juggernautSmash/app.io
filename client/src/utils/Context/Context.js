import React from 'react'

const Context = React.createContext({
  uid:'', // uid from firebase for logging in
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
  showPassword: '', // Boolean to show or hide password
  isLoading: '', // Boolean to determine if a pages is loading
  errors: [], // errors array for getting errors
  employees: [], //array for getting employees names
  handleBur: () => {}, 
  handleInputChange: () => {},
  handleSubmitButton: () => {},
  handleShowPassword: () => {},
  handleMouseDownPassword: () => {},
  handleSubmitSignUp: () => {},
  handleSubmitLogin: () => {},
  displayError: () => {},
  logErrors: () => {},
  clearErrors: () => {},
  isLoginValid: () => {},
  addLocalStorage: () => {},
  getEmployees: () => {},
  getProfile: () => {},
  logout: () => {}
})

export default Context