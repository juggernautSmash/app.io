import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import ProfileContext from '../../utils/ProfileContext'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: '90px',
    width: '90px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  attr: {
    marginTop: theme.spacing(1),
    fontSize: 16
  },
}))

const CompanyDisplay = _ => {

  const classes = useStyles()

  const { company, email, phone, address, employees } = React.useContext(ProfileContext)

  return (
    <Card className="card">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* add photo here */}
          Company Picture
        </Avatar>
      </div>
      <div className = {classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography color="textSecondary" variant="h5" className={classes.attr}>Company</Typography>
            <Typography color="textSecondary" variant="h5" className={classes.attr}>Address</Typography>
            <Typography color="textSecondary" variant="h5" className={classes.attr}>Contact</Typography>
            <Typography color="textSecondary" variant="h5" className={classes.attr}>Employees</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.attr}>
              {company}
            </Typography>
            <Typography variant="h5" className={classes.attr}>
              {address}
            </Typography>
            <Typography variant="h5" className={classes.attr}>
              <p>{email}</p>
              <p>{phone}</p>
            </Typography>
            <Typography variant="h5" className={classes.attr}>
              {employees ? employees.map( (employee, i) => 
                <p key={i}>{employee.name} : {employee.email}</p>
                ) : null
                }
            </Typography>
            </Grid>
          </Grid>
      </div>
    </Card>
  )
}

export default CompanyDisplay