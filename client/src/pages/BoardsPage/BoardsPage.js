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

  boardState.getBoards = _ => {

    setTimeout(() => {

      let boards_id = JSON.parse(localStorage.getItem('board'))
      let boards = []

      boards_id.forEach(board_id => {
        axios.get(`/api/boards/${board_id}`)
          .then(({ data: { _id, title, description, lastUpdated } }) => {
            boards.push({ _id, title, description, lastUpdated })
            console.log('boards are...', boards)
            setBoardState({ ...boardState, boards })
          })
          .catch(e => console.log(e))
      }) // end forEach

      setBoardState({ ...boardState, boards })

    }, 5000)

    setTimeout(() => setBoardState({ ...boardState, isLoading: false }), 5000)

    console.log('boardState.boards is now...', boardState.boards)
  }

  boardState.handleSubmitBoard = id => {
    console.log(id)
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
    const boardLength = JSON.parse(localStorage.getItem('board'))

    if (boardState.boards.length === boardLength) {
      return false
    } else {
      return true
    }
  }
  React.useEffect(() => {
    // console.log('running useEffect. boards are... ', boardState.boards)
    setBoardState({ ...boardState, isLoading: true })
    boardState.getBoards()
  }, [boardState.boardSync()])

  return (
    <BoardContext.Provider value={boardState}>
      {boardState.isLoading && <Loading />}
      <BoardDisplay />
      {/* { boardState.isLoading ? <Loading /> : <BoardDisplay /> } */}
    </BoardContext.Provider>
  )
}

export default BoardsPage