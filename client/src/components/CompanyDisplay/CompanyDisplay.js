import React from 'react'
import Avatar from '@material-ui/core/Avatar'

// Material UI components
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'

//Material-UI icons
import { 
  PhotoCamera,
  Email,
  Phone,
  LocationOn,
 } from '@material-ui/icons'

import Loading from '../Loading'
import CompanyContext from '../../utils/CompanyContext'
import blankProfile from '../../assets/images/blank-profile.png'
import './CompanyDisplay.css'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
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
                <PhotoCamera color="secondary" fontSize="large"/>
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
      <List >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ profile.address ? profile.address : '---'} secondary="ADDRESS" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Email />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={profile.email ? profile.email : '---'} secondary="EMAIL" />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Phone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={profile.phone ? profile.phone : '---'}  secondary="PHONE" />
        </ListItem>
      </List>
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