import React from 'react'
import axios from 'axios'
import BoardDisplay from '../../components/BoardDisplay'
import BoardContext from '../../utils/BoardContext'

const BoardsPage = _ => {

const [boardState, setBoardState]=React.useState({
  boards:[]
})

boardState.getBoards = _ =>{
  let boards_id = JSON.parse(localStorage.getItem('board'))
  let boards = []

  boards_id.forEach( board_id => {
    axios.get(`/api/boards/${board_id}`)
      .then( ({ data: { title, description, lastUpdated }}) => {
        boards.push({title, description, lastUpdated})
        console.log('boards are...', boards)
      })
      .catch( e => console.log(e))
  })
  setBoardState({...boardState, boards})
}

React.useEffect( () => {
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