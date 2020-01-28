import React from 'react'

const SignUpContext = React.createContext({
  title: '',
  photo: '',
  name: '',
  email: '',
  phone: '',
  location: '',
  timezone: '',
  name: '',
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
  isPasswordValid: () => {}
})

export default SignUpContext