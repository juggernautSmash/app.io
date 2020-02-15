import React from 'react'

// Material components
import { AppBar, Toolbar, Typography, IconButton, ButtonGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { yellow } from '@material-ui/core/colors'

// Material Icons
import { Home } from '@material-ui/icons'

// App components
import './NavBar.css'
import LoginModal from '../LoginModal'
import SignupModal from '../SignupModal'
import HamMenu from '../HamMenu'

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
  },
  authButton: {
    textAlign: 'right',
    backgroundColor: yellow[900]
  }
}))

const NavBar = () => {

  const { user } = React.useContext(FirebaseContext)
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          { user ? (
            <IconButton className={ styles.menuButton }>
              <HamMenu />
            </IconButton>

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
            null
          ) : (
              <>
                <LoginModal/>
                <SignupModal/>
              </>
          )
        }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar