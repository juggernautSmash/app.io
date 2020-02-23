import React from 'react'

// Material components
import { makeStyles } from '@material-ui/core/styles'
import { yellow } from '@material-ui/core/colors'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton
} from '@material-ui/core'

// Material Icons
import { Home } from '@material-ui/icons'

// App components
import './HeaderBar.css'
import LoginModal from '../../Modals/Login'
import SignupModal from '../../Modals/Signup'
import HamMenu from '../../Buttons/HamMenu'

// Context
import { FirebaseContext } from '../../../utils/Auth'

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

const HeaderBar = () => {

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

export default HeaderBar