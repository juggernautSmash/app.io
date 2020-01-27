import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'

const CompanyLogin = _ => {
  
  return (
    <form>
    <div>
      <FormControl>
        <InputLabel htmlFor="companyName">Company Name</InputLabel>
        <Input id="companyName" aria-describedby="companyName-helper-text" />
        <FormHelperText id="companyName-helper-text"></FormHelperText>
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

export default CompanyLogin