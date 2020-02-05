import React from 'react'

const BottomBarContext = React.createContext({
  _id: '',
  title: '',
  description: '',
  isLoading: '',
  errors: [],
  boards:[],
  handleInputChange: () => {},
  handleSubmitBoard: () => {},
  handleSubmitTable: () => {},
  displayError: () => {}
})

export default BottomBarContext