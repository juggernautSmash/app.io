import React from 'react'

const BoardContext = React.createContext({
  title: '',
  currentTitle: '',
  description: '',
  isLoading: '',
  boards: [],
  errors: [],
  getBoards: () => { },
  displayError: () => { },
  handleInputChange: () => { },
  handleUpdateBoard: () => { },
  handleSubmitTable: () => { },
  handleDeleteBoard: () => { }
})

export default BoardContext