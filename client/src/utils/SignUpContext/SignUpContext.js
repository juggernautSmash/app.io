import React from 'react'

const SignUpContext = React.createContext({
  uid: '',
  title: '',
  photo: '',
  name: '',
  email: '',
  phone: '',
  location: '',
  timezone: '',
  companyName: '',
  address: '',
  contact: '',
  showPassword: '',
  isLoading: '',
  password: '',
  verifyPassword: '',
  errors: [],
  handleInputChange: () => {},
  handleSubmitButton: () => {},
  handleShowPassword: () => {},
  handleMouseDownPassword: () => {},
  isSignUpValid: () => {},
  isFormEmpty: () => {},
  isPasswordValid: () => {},
  logError: () => {},
  addLocalStorage: () => {}
})

export default SignUpContext