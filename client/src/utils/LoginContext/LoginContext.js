import React from 'react'

const LoginContext = React.createContext({
  email: '',
  password: '',
  showPassword: '',
  errors: [],
  handleInputChange: () => {},
  handleSubmitButton: () => {},
  handleShowPassword: () => {},
  handleMouseDownPassword: () => {},
  isLoginValid: () => {}
})

export default LoginContext