import React from 'react'

const TableContext = React.createContext({
  boardTitle: '',
  boardDescription: '',
  tables: []
})

export default TableContext