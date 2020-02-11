import React from 'react'
import Moment from 'moment'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'

import BoardContext from '../../utils/BoardContext'
import EditBoardModal from '../../components/EditBoardModal'
import './BoardDisplay.css'

const BoardDisplay = () => {

  const { boards } = React.useContext(BoardContext)

  return (
    <>
      {
        boards.length ? boards.map((board, i) =>
          <Card key={i} className="card" variant="outlined" id={ i === 0 ? 'firstBoard' : i === boards.length -1 ? 'lastBoard' : null }>
            <CardActionArea>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <EditBoardModal board={board} />
                  </IconButton>
                }
                title={board.title}
                subheader={ 'Updated: ' + Moment(board.lastUpdated).format('LLL')}
              />
                <CardHeader
                title= {
                  <Typography variant="subtitle2" color="textSecondary" component="h1">
                    Descritpion:
                  </Typography>
                }
                subheader={board.description}
                  />
              
            </CardActionArea>
          </Card >
        ) : null
      }
    </>
  ) // end return

}

export default BoardDisplay