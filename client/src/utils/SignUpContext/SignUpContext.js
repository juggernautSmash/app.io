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
  errors: [],
  isLoading: '',
  password: '',
  verifyPassword: '',
  handleInputChange: () => {},
  handleSubmitButton: () => {},
  handleShowPassword: () => {},
  handleMouseDownPassword: () => {},
  isSignUpValid: () => {},
  isFormEmpty: () => {},
  isPasswordValid: () => {}
})

export default SignUpContext