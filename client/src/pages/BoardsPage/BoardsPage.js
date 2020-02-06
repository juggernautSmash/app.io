import React from 'react'
import axios from 'axios'
import BoardDisplay from '../../components/BoardDisplay'
import Loading from '../../components/Loading'
import BoardContext from '../../utils/BoardContext'

const BoardsPage = _ => {

const [boardState, setBoardState]=React.useState({
  isLoading: false,
  boards:[]
})

boardState.getBoards = _ => {

  setTimeout( () => {

    let boards_id = JSON.parse(localStorage.getItem('board'))
    let boards = []
  
    boards_id.forEach( board_id => {
      axios.get(`/api/boards/${board_id}`)
        .then( ({ data: { title, description, lastUpdated }}) => {
          boards.push({title, description, lastUpdated})
          console.log('boards are...', boards)
          setBoardState({ ...boardState, boards })
        })
        .catch( e => console.log(e))
    }) // end forEach

    setBoardState({...boardState, boards })
    
  }, 5000)

  setTimeout( () => setBoardState({ ...boardState, isLoading: false}), 5000)
  
  console.log('boardState.boards is now...', boardState.boards)
}

boardState.boardSync = () => {
  const boardLength = JSON.parse(localStorage.getItem('board'))
  
  if(boardState.boards.length === boardLength){
    return false
  } else {
    return true
  }
}

React.useEffect( () => {
  console.log('running useEffect. boards are... ', boardState.boards)
  setBoardState({ ...boardState, isLoading: true })
  boardState.getBoards()
}, [ boardState.boardSync() ])

  return (
    <BoardContext.Provider value={boardState}>
      { boardState.isLoading && <Loading /> }
      <BoardDisplay />
      {/* { boardState.isLoading ? <Loading /> : <BoardDisplay /> } */}
    </BoardContext.Provider>
  )
}

export default BoardsPage