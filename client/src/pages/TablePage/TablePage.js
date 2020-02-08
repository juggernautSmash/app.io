import React from 'react'
import axios from 'axios'
import TaskContext from '../../utils/TaskContext'
import TableDisplay from '../../components/TableDisplay'


const TableDisplayPage = props => {

  console.log('Profile display page props...', props)

  const [state, setState] = React.useState({
    title: '',
    owner: '',
    task: [],
    assigned: '',
    dueDate: '',
    priority: '',
    status: '',
    text: '',
    timeline: '',
    date: '',
    numbers: '',
    board: '',
    user: ''
  })

  state.getTable = _ => {
    setState({ ...state })
    // get table info from DB
    axios.get('/api/tables')
      .then(({data: table}) => {
        console.log(table[0])
        console.log(table)
        setState({
          tasks: table[0].tasks,
          title: table[0].title,
          owner: table[0].owner,
        //   // task: [],
          assigned: table[0].assigned,
          dueDate: table[0].dueDate,
          priority: table[0].priority,
          status: table[0].status,
        //   text: data.text,
        //   timeline: data.timeline,
        //   date: data.date,
        //   numbers: data.numbers,
        //   board: data.board,
        //   user: data.user,
        })
        
      })


  }

  React.useEffect(() => {
    // on page load, get the profile
    state.getTable()

  }, [])


  return (
    <TaskContext.Provider value={state}>
      <TableDisplay />
    </TaskContext.Provider>
  )

}

export default TableDisplayPage