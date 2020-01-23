import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import {IconButton, ButtonGroup, Fab, Grid} from '@material-ui/core'

// Icons
import AddIcon from '@material-ui/icons/Add'
import GroupIcon from '@material-ui/icons/Group'
import PieChartIcon from '@material-ui/icons/PieChart'
import SettingsIcon from '@material-ui/icons/Settings'
import ChatIcon from '@material-ui/icons/Chat'

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

const FooterBar = () => {

  const classes = useStyles();

  return (
    <>
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
              <AddIcon />
            </Fab>
          </Toolbar>
      </AppBar>
    </>
  )
}

export default FooterBar