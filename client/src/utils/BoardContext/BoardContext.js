import React from 'react'

const BoardContext = React.createContext({
  title: '',
  description: '',
  isLoading: '',
  boards: [],
  errors: [],
  displayError: () => { },
  handleInputChange: () => {},
  handleInputChange: () => { },
  handleSubmitBoard: () => { },
  handleSubmitTable: () => { }
})

export default BoardContext