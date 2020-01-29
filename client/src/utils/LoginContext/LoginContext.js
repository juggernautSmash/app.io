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
  addLocalStorage: () => {}
})

export default LoginContext