import React from 'react'
import Moment from 'moment'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';

import { Link } from 'react-router-dom'

import BoardContext from '../../utils/BoardContext'
import EditBoardModal from '../../components/EditBoardModal'
import './BoardDisplay.css'

const BoardDisplay = () => {

  const { boards } = React.useContext(BoardContext)

  return (
    <>
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
                    <DeleteIcon >
                      {/* <EditBoardModal board={board} /> */}
                    </DeleteIcon >
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
                    <Typography variant="subtitle2" color="textSecondary" component="h1">
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
    </>
  ) // end return

}

export default BoardDisplay