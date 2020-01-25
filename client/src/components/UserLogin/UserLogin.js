import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'

const UserLogin = _ => {

  return (
    <form>
      <div>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" aria-describedby="email-helper-text" />
          <FormHelperText id="email-helper-text"></FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" aria-describedby="password-helper-text" />
          <FormHelperText id="password-helper-text"></FormHelperText>
        </FormControl>
      </div>
      <div>
        <Button>Submit</Button>
      </div>
    </form>
  )
}

export default UserLogin