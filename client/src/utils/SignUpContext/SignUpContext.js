import React from 'react'

const SignUpContext = React.createContext({
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
  logError: () => {}
})

export default SignUpContext