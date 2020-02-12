import React from 'react'
import axios from 'axios'
import TableContext from '../../utils/TableContext'
import TableDisplay from '../../components/TableDisplay'


const TableDisplayPage = props => {

  const boardId = props.match.params.boardId

  console.log('board name is...', boardId)

  const [state, setState] = React.useState({
    boardTitle: '',
    boardDescription: '',
    tables: []
  })

  state.getTablesFromDB = async function (id) {
    console.log('getting tables from DB')

    let tables = new Promise ( (resolve, reject) => {

      axios.get(`/api/boards/${id}`)
        .then( ({ data }) => {
          console.log('getting board info successful.', data )
          data.table.forEach( t => {
            state.getTasksFromTable (t)
            // console.log('this is a table', t)
            // console.log('these are the tasks in the table', t.task)
          })
          resolve(data)
        })
        .catch( e => {
          console.error('error getting board info', e)
          reject(new Error('Error getting tables', e))
        })
    })

    return tables
  }

  state.getTasksFromTable = ({_id}) => {

    // let table = new Promise ( (resolve, reject) => {
    //   axios.get(`/api/tables/${_id}`)
    //    .then( t => {})
    // })

    // task.forEach( t => {
      axios.get(`/api/tables/${_id}`)
        .then( item => console.log('Task extracted from table', item.data))
        .catch( e => console.error('error getting tasks', e))
    // })

    // return tasks
  }

  state.getTable = _ => {
    setState({ ...state })
    // get table info from DB
    axios.get('/api/tables')
      .then(({data: table}) => {
        console.log(' getTable tables ', table)
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
    //state.getTable()
    state.getTablesFromDB(boardId)
      .then( data => setState({ 
        ...state, 
        tables: data.table,
        boardTitle: data.title,
        boardDescription: data.description
        })
       )
      .catch( e => console.error('error getting tables', e))

  }, [])


  return (
    <TableContext.Provider value={state}>
      <TableDisplay />
    </TableContext.Provider>
  )

}

export default TableDisplayPage