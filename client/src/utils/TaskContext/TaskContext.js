import React from 'react'

const TaskContext = React.createContext({
  title: '',
  owner: '',
  task: [],
  row: [],
  assigned: '',
  dueDate: '',
  priority: '',
  status: '',
  text: '',
  timeline: '',
  date: '',
  numbers: '',
  board: '',
  user: '',
  taskSubmit: () => { },
  inputChange: () => { },
  getTasks: () => {}
})

export default TaskContext