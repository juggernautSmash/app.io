import React from 'react'
import axios from 'axios'
import BoardDisplay from '../../components/BoardDisplay'
import Loading from '../../components/Loading'
import BoardContext from '../../utils/BoardContext'

const BoardsPage = _ => {

  const [boardState, setBoardState] = React.useState({
    title: '',
    description: '',
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
    setBoardState({ ...boardState, isLoading: true })
    //get the user id
    boardState.getLocalStorageItem('user')
    .then( ({_id}) =>{
      axios.get(`/api/employees/${_id}`)
      .then( ({data: { boards }}) => {
        //get boards from the user DB
        console.log('boards from DB... ', boards)
        boardState.addLocalStorage('boards', boards)
        .then( boardList => {
          console.log('pushing boards to localStorage successful')
          let boards = []
          boardList.forEach( boardId => {
            axios.get(`/api/boards/${boardId}`)
              .then( ({ data: { _id, title, description, lastUpdated } }) => {
                boards.push({ _id, title, description, lastUpdated })
                //console.log('boards are...', boardState.boards)
                setBoardState({ ...boardState, boards, isLoading: false })
              })
              .catch( e => console.error('error getting boards from database', e))
          }) // end forEach
          console.log('checking the boardState.boards', boardState.boards)
        })
        .catch( e => console.error('error adding boards to storage', e))
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
          // console.log('axios board put is hit', response)
        })
        .catch(e => console.error(e))
    }
    else {
      console.log(' error submitting boardState.title is...', boardState.title)
      // boardState.logError({ message: 'Please enter a title' })
    }
  }

  boardState.boardSync = () => {
    const boardLength = JSON.parse(localStorage.getItem('boards'))

    if (boardState.boards.length === boardLength) {
      return false
    } else {
      return true
    }
  }
  
  React.useEffect(() => {
    // console.log('running useEffect. boards are... ', boardState.boards)
    // setBoardState({ ...boardState, isLoading: true })
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
