import React from 'react'
import {
  Avatar,
  Typography,
  Card,
  CircularProgress,
  CardHeader,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@material-ui/core'
import {
  Edit,
  ListAlt,
  Email,
  Phone,
  LocationCity,
  AccessTime
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

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
  formsss: {
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
          onChange={handleImageUpload}
        />
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={
            <IconButton onClick={handleFileUpload}>
              <Edit color="secondary" fontSize="large" />
            </IconButton>}
        >
          <Avatar
            className={classes.avatar}
            src={photoUrl}
          >
            <h3>{firstName[0] + lastName[0]}</h3>
          </Avatar>
        </Badge>
      </div>
      {/* <div className={classes.form}> */}
      <h1>{firstName + ' ' + lastName}</h1>
      <List >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ListAlt />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Title:" secondary={title ? title : '---'} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Email />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email:" secondary={email} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Phone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Phone:" secondary={phone ? phone : '---'} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationCity />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Location:" secondary={location ? location : '---'} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Time Zone:" secondary={timezone ? timezone : '---'} />
        </ListItem>
      </List>
      {/* </div> */}
    </Card>
  )
}

export default ProfileDisplay
