import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import BoardContext from '../../utils/BoardContext'
import './BoardDisplay.css'

const BoardDisplay = () => {

  const { boards } = React.useContext(BoardContext)

  return (
    <>
      {
        boards.length ? boards.map((board, i) =>
          <Card className="card" variant="outlined" >
            <CardActionArea>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={board.title}
                subheader="LastUpdated"
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                    {board.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card >
        ) : null
      }
    </>
  ) // end return

}

export default BoardDisplay