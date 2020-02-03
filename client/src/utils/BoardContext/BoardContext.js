import React from 'react'

const BoardContext = React.createContext({
  title: '',
  description: '',
  boards:[]
})

export default BoardContext