import React from 'react'
import {
  Avatar, 
  Typography, 
  Card, 
  CircularProgress,
  CardHeader,
  IconButton,
  Badge
 } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { Edit as EditIcon } from '@material-ui/icons'

import './ProfileDisplay.css'
import blankProfile from '../../assets/images/blank-profile.png'
import Context from '../../utils/Context'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    height: '20vh',
    width: '20vh'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    color: red[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const ProfileDisplay = () => {
  
  const classes = useStyles()

  const { 
    firstName, 
    lastName, 
    title, 
    email, 
    phone, 
    location, 
    timezone, 
    photoUrl,
    isLoading,
    handleFileUpload,
    handleImageUpload
   } = React.useContext(Context)

  return (    
    <Card className="card">
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
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
              src={ photoUrl || blankProfile}
          />
        </Badge>
      </div>
      <div className = {classes.form}>
      <h1>{firstName + ' ' + lastName}</h1>
      {/* <h2><AlternateEmailTwoTone /> {email}</h2> */}
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Title</Typography>
        <Typography variant="body1">
          { title ? title : '---' }
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Email</Typography>
        <Typography variant="body1">
          { email }
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Phone</Typography>
        <Typography variant="body1">
          { phone ? phone : '---' }
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Location</Typography>
        <Typography variant="body1">
          { location ? location : '---'}
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" className={classes.labels}>Time Zone</Typography>
        <Typography variant="body1">
          { timezone ? timezone : '---' }
        </Typography>
      </div>
    </Card>
  )
}

export default ProfileDisplay
