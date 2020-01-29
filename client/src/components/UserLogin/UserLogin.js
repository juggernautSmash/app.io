import React from 'react'
import './UserLogin.css'
import { FormControl, InputLabel, Input, FormHelperText, Button,
  InputAdornment,  IconButton, CircularProgress } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'

import LoginContext from '../../utils/LoginContext'

const useStyles = makeStyles(theme => ({    
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}))

const UserLogin = _ => {

  const styles = useStyles()

  const { email, password, showPassword, errors, isLoading,
    handleInputChange, handleSubmitButton, handleShowPassword, handleMouseDownPassword } = React.useContext(LoginContext)

  return (
    <form id="CL">
      <div>
        <h1>Login to app.io</h1>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input 
            id="email" 
            name="email"
            aria-describedby="email-helper-text"
            onChange={handleInputChange}
            value={email} />
          <FormHelperText id="email-helper-text"></FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input 
            id="password" 
            name="password" 
            aria-describedby="password-helper-text"
            onChange={handleInputChange}
            value={password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="password-helper-text"></FormHelperText>
        </FormControl>
      </div>
      <div className={styles.wrapper}>
        <Button 
            disabled={isLoading}
            onClick={handleSubmitButton}
        >
            Submit
        </Button>
        {isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
      </div>
    </form>
  )
}

export default UserLogin