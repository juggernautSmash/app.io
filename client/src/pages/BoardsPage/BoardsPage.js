import React from 'react'
import axios from 'axios'
import BoardDisplay from '../../components/BoardDisplay'
import BoardContext from '../../utils/BoardContext'

const BoardsPage = _ => {

  const [boardState, setBoardState] = React.useState({
    title: '',
    description: '',
    boards: []
  })


  boardState.handleInputChange = e => setBoardState({ ...boardState, [e.target.name]: e.target.value })

  boardState.getBoards = _ => {
    let boards_id = JSON.parse(localStorage.getItem('board'))
    let boards = []

    boards_id.forEach(board_id => {
      axios.get(`/api/boards/${board_id}`)
        .then(({ data: { title, description, lastUpdated, _id } }) => {
          boards.push({ title, description, lastUpdated, _id })
          console.log('boards are...', boards)
        })
        .catch(e => console.log(e))
    })
    setBoardState({ ...boardState, boards })
  }

  boardState.handleSubmitBoard = id => {
    console.log(id)
    if (boardState.title) { // if title has an entry let the push happen
      setBoardState({ ...boardState, isLoading: true }) // so we can disable the submit button after it is pressed once.

      // get the _id from the localStorage
      const user = JSON.parse(localStorage.getItem('user'))._id

      // for cleaner code, set the req.body to a variable
      const payload = {
        title: boardState.title,
        description: boardState.description
      }

      // post the created board in mongo
      axios.put(`/api/boards/${id}`, payload)
        .then(response => {
          console.log('axios board put is hit', response)
        })
        .catch(e => console.error(e))
    } else {
      console.log(' error submitting boardState.title is...', boardState.title)
      // boardState.logError({ message: 'Please enter a title' })
    }
  }

  React.useEffect(() => {
    console.log('running useEffect. boards are... ', boardState.boards)
    boardState.getBoards()
  }, [])

  return (
    <BoardContext.Provider value={boardState}>
      <BoardDisplay />
    </BoardContext.Provider>
  )
}

export default BoardsPage