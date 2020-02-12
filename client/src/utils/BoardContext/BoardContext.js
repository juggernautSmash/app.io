import React from 'react'

const BoardContext = React.createContext({
  title: '',
  currentTitle: '',
  description: '',
  isLoading: '',
  boards: [],
  errors: [],
  displayError: () => { },
  handleInputChange: () => { },
  handleUpdateBoard: () => { },
  handleSubmitTable: () => { }
})

export default BoardContext