import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import UserLogin from '../../components/UserLogin'
import CompanyLogin from '../../components/CompanyLogin'

const useStyles = makeStyles({
  root: {
    marginTop: "70px",
  },
})

const LoginPage = _ => {

  const styles = useStyles()

  return (  
    <Paper variant="outlined" justify="center" className={styles.root}>
      <BrowserRouter>
          <Link to ="/login/company">
            <Button>Company Login</Button>
          </Link>
        <br></br>
        <Link to ="/login/employee">
          <Button>Employee Login</Button>
        </Link>
      </BrowserRouter>
    </Paper>
  ) 
}

export default LoginPage