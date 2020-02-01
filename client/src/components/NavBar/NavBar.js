import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Icons
import { Menu, ExitToApp } from '@material-ui/icons'

import LoginContext from '../../utils/LoginContext'

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
  const styles = useStyles()

  const { isLoggedIn } = React.useContext(LoginContext)

  return (
    <div className={styles.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" className={ styles.menuButton}  color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={ styles.title }>
            app.io
          </Typography>
          { isLoggedIn ? <Link to="/"><Button><IconButton><ExitToApp/></IconButton></Button></Link> : <Link to="/login"><Button>Login</Button></Link> }
          { isLoggedIn ? null : <Link to="/signup"><Button>Sign Up</Button></Link> }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar