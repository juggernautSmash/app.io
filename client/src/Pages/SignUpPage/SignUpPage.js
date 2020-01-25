import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import UserForm from '../../components/UserForm'
import CompanyForm from '../../components/CompanyForm'

const SignUpPage = _ => {

  return (
    <Paper variant="outlined" justify="center">
      <BrowserRouter>
        <Button onClick={() => console.log('Company clicked')}>
        <Link to ="/signup/company">Company Sign Up</Link>
        </Button>
        <br></br>
        <Link to ="/signup/employee" onClick={() => console.log('Employee clicked')}>Employee Sign Up</Link>
        <Switch>
          <Route path="/signup/company" render={ _=> <CompanyForm /> } />
          <Route path="/signup/employee" render={ _=> <UserForm /> } />
        </Switch>
      </BrowserRouter>
    </Paper> 
  )
}

export default SignUpPage