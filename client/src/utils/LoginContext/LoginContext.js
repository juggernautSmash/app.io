import React from 'react'

const LoginContext = React.createContext({
  uid:'',
  email: '',
  password: '',
  showPassword: '',
  errors: [],
  handleInputChange: () => {},
  handleSubmitButton: () => {},
  handleShowPassword: () => {},
  handleMouseDownPassword: () => {},
  isLoginValid: () => {},
  logErrors: () => {},
  addLocalStorage: () => {}
})

export default LoginContext