import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Button,
  InputAdornment,  IconButton, CircularProgress } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import Context from '../../utils/Context'
import './CompanyLogin.css'

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

const CompanyLogin = _ => {

  const styles = useStyles()

  const { 
    email, 
    password, 
    errors, 
    showPassword, 
    isLoading,
    clearErrors,
    handleBlur,
    handleInputChange, 
    handleSubmitCompanyLogin, 
    handleShowPassword, 
    handleMouseDownPassword,
    displayError } = React.useContext(Context)
  
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
            onBlur={handleBlur}
            onClick={clearErrors}
            error={
              errors.some(e => (e.message.toLowerCase().includes('email')) ? true : false)
            }
            value={email} />
          <FormHelperText id="email-helper-text">
            {
                errors.some(e => (e.message.toLowerCase().includes('email'))) ? displayError(errors) : ''
            }
          </FormHelperText>
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
            onBlur={handleBlur}
            onClick={clearErrors}
            value={password}
            type={showPassword ? 'text' : 'password'}
            error={
              errors.some(e => (e.message.toLowerCase().includes('password')) ? true : false)
            }
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
          <FormHelperText id="password-helper-text">
            {
                errors.some(e => (e.message.toLowerCase().includes('password'))) ? displayError(errors) : ''
            }
          </FormHelperText>
        </FormControl>
      </div>
      <div className={styles.wrapper}>
        <Button 
            disabled={isLoading}
            onClick={handleSubmitCompanyLogin}
        >
            Submit
        </Button>
        {isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
      </div>
    </form>
  )
}

export default CompanyLogin