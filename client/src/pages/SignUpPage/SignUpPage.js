import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    marginTop: "70px",
  },
})

const SignUpPage = _ => {

  const styles = useStyles()

  return (
    <Paper variant="outlined" justify="center" className={styles.root}>
        <Link to ="/signup/company">
        <Button>Company Sign Up</Button>
        </Link>
        <br></br>
        <Link to ="/signup/employee">
          <Button>Employee Sign Up</Button>
        </Link>
    </Paper> 
  )
}

export default SignUpPage