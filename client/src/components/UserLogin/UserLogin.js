import React from 'react'
import './UserLogin.css'
import { FormControl, InputLabel, Input, FormHelperText, Button,
  InputAdornment,  IconButton} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LoginContext from '../../utils/LoginContext'

const UserLogin = _ => {

  const { email, password, showPassword, errors,
    handleInputChange, handleSubmitButton, handleShowPassword, handleMouseDownPassword } = React.useContext(LoginContext)

  return (
    <form>
      <div>
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
      <div>
        <Button onClick={handleSubmitButton}>Submit</Button>
      </div>
    </form>
  )
}

export default UserLogin