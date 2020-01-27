import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import UserSignUpPage from '../UserSignUpPage'
import CompanySignUpPage from '../CompanySignUpPage'

const useStyles = makeStyles({
  root: {
    marginTop: "70px",
  },
})

const SignUpPage = _ => {

  const styles = useStyles()

  return (
    <Paper variant="outlined" justify="center" className={styles.root}>
      <BrowserRouter>
        <Link to ="/signup/company">
        <Button>Company Sign Up</Button>
        </Link>
        <br></br>
        <Link to ="/signup/employee">
          <Button>Employee Sign Up</Button>
        </Link>
      </BrowserRouter>
    </Paper> 
  )
}

export default SignUpPage