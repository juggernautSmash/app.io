import React from 'react'

// Material components
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Material Icons
import { Menu, ExitToApp, Home } from '@material-ui/icons'

// App components
import LoginModal from '../LoginModal'
import SignupModal from '../SignupModal'
import HamMenu from '../HamMenu'

// Context
import { FirebaseContext } from '../../utils/Auth'
import Context from '../../utils/Context'

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    textAlign: 'center',
    flexGrow: 1
  }
}))

const NavBar = () => {

  const { user } = React.useContext(FirebaseContext)
  const { logout } = React.useContext(Context)

  return (
    <div className={styles.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          { user ? (
            <HamMenu />
          ) : (
            <IconButton edge="start" className={ styles.menuButton }  color="inherit" aria-label="menu">
              <Home />
            </IconButton>
          )
          }
          <Typography variant="h6" className={ styles.title }>
            app.io
          </Typography>
          { user ? (
            <IconButton edge="end" className={ styles.menuButton }  color="inherit" aria-label="menu"  onClick={logout}>
              <ExitToApp/> 
            </IconButton>
          ) : (
            <>
              <Button><LoginModal/></Button>
              <Button><SignupModal/></Button>
            </>
          )
        }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar