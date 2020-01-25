import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import UserLogin from '../../components/UserLogin'
import CompanyLogin from '../../components/CompanyLogin'

const LoginPage = _ => {

  return (  
    <Paper variant="outlined" justify="center">
      <BrowserRouter>
        <Button onClick={() => console.log('Company login')}>
          <Link to ="/login/company">Company Login</Link>
        </Button>
        <br></br>
        <Link to ="/login/employee" onClick={() => console.log('Employee login')}>Employee Login</Link>
        <Switch>
          <Route path="/login/company" render={ _=> <CompanyLogin/> } />
          <Route path="/login/employee" render={ _=>  <UserLogin /> } />
        </Switch>
      </BrowserRouter>
    </Paper>
  ) 
}

export default LoginPage