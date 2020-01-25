import React from 'react'

const LoginContext = React.createContext({
  email: '',
  password: '',
  handleInputChange: () => {},
  handleSubmitButton: () => {}
})