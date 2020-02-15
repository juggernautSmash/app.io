import React from 'react'
import axios from 'axios'
import BoardDisplay from '../../components/BoardDisplay'
import Loading from '../../components/Loading'
import BoardContext from '../../utils/BoardContext'

const BoardsPage = _ => {

  const [boardState, setBoardState] = React.useState({
    title: '',
    description: '',
    isLoading: false,
    errors: [],
    boards: []
  })

  boardState.handleInputChange = e => setBoardState({ ...boardState, [e.target.name]: e.target.value })

  // store to localStorage
  boardState.addLocalStorage = async function (key, value) {
    console.log(`Putting key "${key}" in localStorage with value`, value)

    let storedItem = await new Promise( (resolve, reject) => {
      localStorage.setItem(key, JSON.stringify(value))
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  // get item from localSotrage
  boardState.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  boardState.getBoards = _ => {
    console.log('running getBoards')

    const boardList = []

    setBoardState({ ...boardState, isLoading: true })
    //get the user id
    boardState.getLocalStorageItem('user')
    .then( ({_id}) =>{
      axios.get(`/api/employees/${_id}`)
      .then( ({data: { boards }}) => {
        //get boards from the user DB
        console.log('boards from DB... ', boards)

        boards.forEach( board => {
          boardList.push(board)
          setBoardState({ ...boardState, boards: boardList, isLoading: false})
        })
      })
      .catch( e => console.error('error getting boards', e))
    })
    .catch( e => console.error('error getting user _id', e))

    console.log('boardState.boards is now...', boardState.boards)
  }

  boardState.handleUpdateBoard = id => {
    console.log('submit board is pressed. Board ID is...', id)
    if (boardState.title && boardState.description) { // if title has an entry let the push happen
      setBoardState({ ...boardState, isLoading: true }) // so we can disable the submit button after it is pressed once.

      // for cleaner code, set the req.body to a variable
      const payload = {
        title: boardState.title,
        description: boardState.description
      }
      // post the created board in mongo
      axios.put(`/api/boards/${id}`, payload)
        .then(response => {
          // console.log('axios board put is hit', response)
        })
        .catch(e => console.error(e))
    } else if (!boardState.title && boardState.description) {
      setBoardState({ ...boardState, isLoading: true }) // so we can disable the submit button after it is pressed once.

      // for cleaner code, set the req.body to a variable
      const payload = {
        description: boardState.description
      }
      // post the created board in mongo
      axios.put(`/api/boards/${id}`, payload)
        .then(response => {
          // console.log('axios board put is hit', response)
        })
        .catch(e => console.error(e))
    } else if (boardState.title && !boardState.description) {
      setBoardState({ ...boardState, isLoading: true }) // so we can disable the submit button after it is pressed once.

      // for cleaner code, set the req.body to a variable
      const payload = {
        title: boardState.title
      }
      // post the created board in mongo
      axios.put(`/api/boards/${id}`, payload)
        .then(response => {
          boardState.getBoards()
        })
        .catch(e => console.error(e))
    }
    else {
      console.log(' error submitting boardState.title is...', boardState.title)
      // boardState.logError({ message: 'Please enter a title' })
    }
  }

  boardState.handleSubmitBoard = e => {
    console.log('submit board pressed')
    e.preventDefault()
    if(boardState.title){ // if title has an entry let the push happen
      setBoardState({ ...boardState, isLoading: true}) // so we can disable the submit button after it is pressed once.

      // get the user _id from the localStorage
      boardState.getLocalStorageItem('user')
        .then( ({_id}) => {

          // for cleaner code, set the req.body to a variable
          const payload = {
            owner: _id,
            title: boardState.title,
            description: boardState.description
          }

          // post the created board in mongo
          axios.post(`/api/boards`, payload)
            .then( ({data}) => {
              console.log('board created is...', data)
              boardState.createTable(data._id)
              boardState.getBoards()
            })
            .catch( e => console.error('error posting new board', e))
        })
        .catch( e => console.error('error getting user from storage', e))
    } else {
      boardState.logError({ message: 'Please enter a title'})
    }
  }

  boardState.createTable = boardId => {
    console.log('running create table for board# ', boardId)

    const newTable = {
      board: boardId,
      title: "New Table"
    }

    axios.post(`/api/tables`, newTable)
    .then( r => {
      console.log('successfully created table', r)

      // generate tasks in the table
      for( let k = 0; k<3 ; k++ ){
        const taskPayload = {
          table: r.data._id,
          task: `New Task #${k}`
        }

        axios.post('/api/task', taskPayload)
          .then( r => {
            console.log('successfully added task to table')
          })
          .catch( e => console.error('error posting tasks to table', e))
      } // end for loop generating tasks
    })
    .catch( e => console.error('error posting table to the database', e))
  }

  boardState.displayError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  boardState.handleDeleteBoard = id => {
    setBoardState({ ...boardState, isLoading: true})
    console.log('deleting table id ', id )

    axios.delete(`/api/boards/${id}`)
     .then( r => {
       console.log('delete table successsful', r)
       setBoardState({ ...boardState, isLoading: false})
       boardState.getBoards()  
     })
     .catch( e => console.error('error deleting table', e))
  }

  React.useEffect(() => {
    boardState.getBoards()

  }, [ ])

  return (
    <BoardContext.Provider value={boardState}>
      {boardState.isLoading && <Loading />}
      <BoardDisplay />
      {/* { boardState.isLoading ? <Loading /> : <BoardDisplay /> } */}
    </BoardContext.Provider>
  )
}

export default BoardsPage
