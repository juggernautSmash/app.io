import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChatIcon from '@material-ui/icons/Chat'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'

// Icons
import AddIcon from '@material-ui/icons/Add'
import GroupIcon from '@material-ui/icons/Group'
import PieChartIcon from '@material-ui/icons/PieChart'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  }
}))

const FooterBar = () => {


  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Grid container>
          <Toolbar>
            <Grid item sm>
              <IconButton edge="start" color="inherit">
                <GroupIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" >
                <ChatIcon fontSize="large"/>
              </IconButton>
            </Grid>
            <Fab color="secondary" aria-label="add" className={classes.fabButton}>
              <AddIcon />
            </Fab>
            <Grid item sm>
              <IconButton color="inherit" >
                <PieChartIcon fontSize="large"/>
              </IconButton>
              <IconButton edge="end" color="inherit">
                <SettingsIcon fontSize="large"/>
              </IconButton>
            </Grid>
          </Toolbar>
        </Grid>
      </AppBar>
    </>
  )
}

export default FooterBar