import React from 'react'
import BoardDisplay from '../../components/BoardDisplay'
import BoardContext from '../../utils/BoardContext'
import ButtonContext from '../../utils/ButtonContext'

const BoardsPage = props => {

  {console.log('props in the boards page is...', props)}
  {console.log('the path is ', props.location)}

  const [ buttonState, setButtonState ] = React.useState({
    page: ''
  })

  const array = [
    { title: 'testTitle1', description: 'testDesc1' },
    { title: 'testTitle2', description: 'testDesc2' },
    { title: 'testTitle3', description: 'testDesc3' }]

const [boardState, setBoardState]=React.useState({
  boards:[]
})

boardState.getBoards = _ =>{
  let boards = JSON.parse(JSON.stringify(boardState.boards))
  boards = array
  setBoardState({...boardState, boards})
}

React.useEffect( () => {
  boardState.getBoards()
  setButtonState({ ...buttonState, page: 'boards'})
}, [])

  return (
    <BoardContext.Provider value={boardState}>
      <BoardDisplay />
    </BoardContext.Provider>
  )
}

export default BoardsPage