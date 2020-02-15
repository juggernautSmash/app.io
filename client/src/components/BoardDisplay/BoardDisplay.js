import React from 'react'
import Moment from 'moment'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container  from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'


import DeleteIcon from '@material-ui/icons/Delete'


import BoardContext from '../../utils/BoardContext'
import EditBoardModal from '../../components/EditBoardModal'
import AddBoardModal from '../../components/AddBoardModal'
import DeleteBoardModal from '../../components/DeleteBoardModal'
import './BoardDisplay.css'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const BoardDisplay = () => {

  const classes = useStyles()
  const { boards } = React.useContext(BoardContext)

  return (
    <Container>
      {
        boards.length ? boards.map((board, i) =>
          <Card key={i} className="card" variant="outlined" id={i === 0 ? 'firstBoard' : i === boards.length - 1 ? 'lastBoard' : null}>
            <CardHeader
              action={
                <>
                  <IconButton aria-label="settings">
                      <EditBoardModal board={board} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteBoardModal boardId={board._id}/>
                  </IconButton>
                </>
              }
              title={board.title}
              subheader={'Updated: ' + Moment(board.lastUpdated).format('LLL')}
            />
            <Link to={`/boards/${board._id}`} className="linkText">
              <CardActionArea>
                <CardHeader
                  title={
                    <Typography variant="subtitle2" color="textSecondary" component="h5">
                      Descritpion:
                    </Typography>
                  }
                  subheader={board.description}
                />
              </CardActionArea>
            </Link>
          </Card >
        ) : null
      }
      <Fab aria-label="Add" className={classes.fab} color="secondary">
        <AddBoardModal />
      </Fab>
    </Container>
  ) // end return

}

export default BoardDisplay