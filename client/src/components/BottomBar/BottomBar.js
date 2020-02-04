import React from 'react'

import { AppBar, Toolbar, Grid, IconButton, Fab} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Icons
import AddIcon from '@material-ui/icons/Add'
import GroupIcon from '@material-ui/icons/Group'
import PieChartIcon from '@material-ui/icons/PieChart'
import SettingsIcon from '@material-ui/icons/Settings'
import ChatIcon from '@material-ui/icons/Chat'

// Buttons
import AddButton from '../AddButton'

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    // zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(1.5),
  }
}))

const BottomBar = _ => {

  const classes = useStyles()

  return (
  <AppBar position="fixed" color="primary" className={classes.bottomBar}>
      <Toolbar>
        <Grid>
          <Grid item xs>
            <IconButton className={classes.margin}>
              <GroupIcon fontSize="large"/>
            </IconButton>
            <IconButton color="inherit" className={classes.margin} >
              <ChatIcon fontSize="large"/>
            </IconButton> 
            <IconButton color="inherit" className={classes.margin} >
              <PieChartIcon fontSize="large" />
            </IconButton>
          <IconButton color="inherit"  className={classes.margin}>
            <SettingsIcon fontSize="large"/>
          </IconButton>
          </Grid>
        </Grid>
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddButton />
        </Fab>
      </Toolbar>
    </AppBar>
  )
}

export default BottomBar