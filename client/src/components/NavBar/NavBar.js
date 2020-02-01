import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// Material components
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


// Icons
import { Menu, ExitToApp } from '@material-ui/icons'

import LoginContext from '../../utils/LoginContext'

// Context
import { FirebaseContext } from '../../utils/Auth'

const styles = makeStyles(theme => ({
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

  const { user } = React.useContext(FirebaseContext)

  return (
    <div className={styles.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" className={ styles.menuButton}  color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={ styles.title }>
            app.io
          </Typography >
          { user ? null : (<Link to="/login"><Button>Login</Button></Link>) }
          { user ? null : (<Link to="/signup"><Button>Sign Up</Button></Link>) }
          { user ? <Button>Logout</Button> : null }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar