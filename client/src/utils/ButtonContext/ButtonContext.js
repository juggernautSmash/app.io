import React from 'react'

const ButtonContext = React.createContext({
  page: '' // so the button know which menu to load
})

export default ButtonContext