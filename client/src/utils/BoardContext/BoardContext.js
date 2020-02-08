import React from 'react'

const BoardContext = React.createContext({
  title: '',
  currentTitle: '',
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