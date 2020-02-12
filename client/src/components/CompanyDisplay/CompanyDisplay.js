import React from 'react'
import Avatar from '@material-ui/core/Avatar'
// import Image from 'material-ui-image'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import { Edit as EditIcon } from '@material-ui/icons'

import Loading from '../Loading'
import CompanyContext from '../../utils/CompanyContext'
import blankProfile from '../../assets/images/blank-profile.png'
import './CompanyDisplay.css'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    height: '20vh',
    width: '20vh'
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(1),
  },
  attr: {
    marginTop: theme.spacing(1),
    fontSize: 16
  },
}))

const CompanyDisplay = _ => {

  const classes = useStyles()

  const { profile, employees, isLoading, handleFileUpload, handleImageUpload } = React.useContext(CompanyContext)

  return (
    <>
    {isLoading && <Loading />}
    <Card className="companyCard">
      <div className={classes.paper}>
      <input 
          type="file" 
          id="imgInput"
          hidden
          onChange={ handleImageUpload }
        />
      <Badge
          overlap="circle"
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          }}
          badgeContent={
            <IconButton onClick={ handleFileUpload }>
                <EditIcon color="secondary" fontSize="large"/>
            </IconButton>}
          >
          <Avatar 
              className={classes.avatar}
              src={ profile.photoUrl || blankProfile}
          />
        </Badge>
      </div>
      <div className = {classes.form}>
      <h1>{ profile.companyName }</h1>
      <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Address</Typography>
        <Typography variant="body1">
          { profile.address ? profile.address : '---' }
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Phone #</Typography>
        <Typography variant="body1">
          { profile.phone ? profile.phone : '---' }
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Email</Typography>
        <Typography variant="body1">
          { profile.email ? profile.email : '---' }
        </Typography>
      </div>
    </Card>
    <Card className="employeeContainer">
      <CardContent>
        <Typography color="textSecondary" variant="body1">Employees</Typography>
        { employees ? (employees.map( employee => 
            <Card className="employeeCard">
              <CardActionArea>
              <CardHeader 
                avatar={
                  <Avatar src={employee.photoUrl || blankProfile } className={classes.small} />
                }
                title={employee.firstName + ' ' + employee.lastName}
                subheader={employee.title}
              />
              </CardActionArea>
            </Card>
          )) : '---'}
      </CardContent>
    </Card>
    </>
  )
}

export default CompanyDisplay