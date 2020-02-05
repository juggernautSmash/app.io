import React from 'react'

const BoardContext = React.createContext({
  title: '',
  description: '',
  isLoading: '',
  boards:[],
  handleInputChange: () => {},
  handleSubmitBoard: () => {},
  handleSubmitTable: () => {}
})

export default BoardContext