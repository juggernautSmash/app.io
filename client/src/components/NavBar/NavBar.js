import React from 'react'
import { Link } from 'react-router-dom'

// Material components
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


// Icons
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

// Context
import { FirebaseContext } from '../../utils/Auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const NavBar = () => {
  const classes = useStyles()

  const { user } = React.useContext(FirebaseContext)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            app.io
          </Typography>
          { user ? null : (<Link to="/login"><Button>Login</Button></Link>) }
          { user ? null : (<Link to="/signup"><Button>Sign Up</Button></Link>) }
          { user ? <Button>Logout</Button> : null }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar