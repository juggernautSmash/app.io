import React from 'react'
import axios from 'axios'
import { DragDropContext } from 'react-beautiful-dnd'

import TableContext from '../../utils/TableContext'
import TableDisplay from '../../components/TableDisplay'


const TableDisplayPage = props => {

  const boardId = props.match.params.boardId

  console.log('board id is...', boardId)

  const [state, setState] = React.useState({
    task: '',
    newTask: '',
    description: '', 
    status: '', 
    tables: [],
    isLoading: false
  })

  state.getTable = _ => {
    setState({ ...state, isLoading: true})

    let tables = []

    axios.get(`/api/boards/${boardId}`)
    .then( ({data :{ table }}) => {
      console.log('table are..', table)
      table.forEach( tab => { //for each table get its contents
        // get table information
        axios.get(`/api/tables/${tab._id}`)
          .then( ({ data }) => {
            console.log('extracted table info...', data )
            tables.push(data)
            setState({ ...state, tables, isLoading: false })
          })
          .catch( e => console.error('error getting table info...', e))
      }) //end forEach
    })
    .catch( e => console.error('error getting board info', e))
  }

  state.handleInputChange = e => setState({ ...state, [e.target.name]: e.target.value})

  state.handleUpdateTask = id => {
    console.log('submit button pressed. Id is...', id)

    setState({ ...state, isLoading: true }) // so we can disable the submit button after it is pressed once.
  
    // // for cleaner code, set the req.body to a variable
    const payload = {
      task: state.task,
      description: state.description,
      dueDate: state.dueDate,
      status: state.status
    }

    // console.log('update task payload is...', payload)
    // post the created board in mongo
    axios.put(`/api/task/${id}`, payload)
      .then(response => {
        console.log('axios task put is hit', response)
        setState({ 
          ...state, 
          isLoading: true,
          task: '',
          description: '', 
          status: ''
          })

      })
      .catch(e => console.error('error updating task... ',e))
  }

  state.handleDeleteTask = id => {
    console.log('delete task id ', id)

    // axios delete task route
    axios.delete(`/api/task/${id}`)
      .then( r => {
        console.log('delete success', r)
        document.getElementById(id).remove()
      })
      .catch( e => console.error('delete failed ', e))
  }

  state.handleAddTask = tableId => {
    console.log('handledAdd task is pressed')

    const payload = {
      table: tableId,
      task: state.newTask
    }

    axios.post(`/api/task/`, payload)
      .then( r => {
        console.log('posting new task to table success', r)
      })
      .catch( e => console.error('posting task to table fail ', e))
  }

  state.handleSubmitTable = e => {
    e.preventDefault()
    console.log('handleSubmitTable was pressed')

    const payload = {
      board: boardId,
      title: state.title,
      description: state.description
    }

    axios.post('/api/tables', payload)
      .then( r => {
        console.log('successfull posting table', r)
      })
      .catch( e => console.error('error posting table', e))
  }

  state.handleEditTable = id => {

    console.log('handleEditTable was pressed. Updating table...', id)
    setState({ ...state, isLoading: true }) // so we can disable the submit button after it is pressed once.
    
    // for cleaner code, set the req.body to a variable
    const payload = {
      title: state.title,
      description: state.description,
    }
    // post the created board in mongo
    axios.put(`/api/tables/${id}`, payload)
      .then(response => {
        console.log('axios table put is hit', response)
      })
      .catch(e => console.error(e))
  }

  state.handleDeleteTable = id => {
    setState({ ...state, isLoading: true})
    console.log('deleting table id ', id )

    axios.delete(`/api/tables/${id}`)
     .then( r => {
       console.log('delete table successsful', r)
       setState({ ...state, isLoading: false})     
     })
     .catch( e => console.error('error deleting table', e))
  }

  state.handleAutoCompleteValue = (key, value) => {
    console.log('handleAutoCompleteValue processing...')
    // console.log(`key is... `, key)
    // console.log('value is... ', value)
    setState({ ...state, [key]: value })
    console.log('state for key... ', key)
    console.log('now has value... ', state.status)
  }

  //get date from localStorage
  state.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
  })
  return storedItem
}

  // state.getEmployees = async function (){

  //   let employees = new Promise( (resolve, reject) => {

  //     state.getLocalStorageItem('company')
  //       .then( company => {
  //         axios.get(`/api/company/name/${company}`)
  //           .then( c => {
  //             console.log('conpany data is...', c.data.employees)

  //             c.data.employees.forEach( employee => {
  //                let payload = {
  //                   employeeId: employee._id,
  //                   name: employee.firstName + ' ' + employee.lastName
  //                } 
  //             }) // end forEach
  //           })
  //           .catch( e => console.error('error getting company from DB ', e))
  //           // end axios get company by name
  //       })
  //       .catch( e => console.error('error getting company from storage ', e))
  //       // end getLocalStorageItem

  //   }) // end Promise

  //   return employees
  // }

  // state.onDragEnd = e => {
  //   console.log('onDragEnd triggered', e)
  // }

  React.useEffect(() => {
    console.log('running useEffect on the table page.')
  
    state.getTable()

  }, [])


  return (
      <TableContext.Provider value={state}>
        <TableDisplay />
      </TableContext.Provider>
  )

}

export default TableDisplayPage