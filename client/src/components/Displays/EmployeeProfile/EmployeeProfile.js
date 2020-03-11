import React from 'react'

// Material-UI components
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import {
  Avatar,
  Card,
  CircularProgress,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CardHeader,
} from '@material-ui/core'

// Material-UI icons
import {
  Business,
  Email,
  Phone,
  LocationOn,
  AccessTime,
  PhotoCamera
} from '@material-ui/icons'


// Local files
import './EmployeeProfile.css'
import Context from '../../../utils/Context'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(14)
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    height: '30vh',
    width: '30vh'
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

const EmployeeProfile = () => {

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
    company,
    isLoading,
    handleFileUpload,
    handleImageUpload
  } = React.useContext(Context)

  return (
    <Card className="profileCard">
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      <div>
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
              <PhotoCamera color="secondary" fontSize="large" />
            </IconButton>}
        >
          <Avatar
            className={classes.avatar}
            src={photoUrl}
          >
            <span id="initials">{firstName[0] + lastName[0]}</span>
          </Avatar>
        </Badge>
      </div>
      <CardHeader 
        title={<h1>{firstName + ' ' + lastName}</h1>}
        subheader={<h3>{title ? title : null}</h3>}
      />
      {/* <h1>{firstName + ' ' + lastName}</h1>
      <h4>{title ? title : null}</h4> */}
      <List >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Business />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Company" secondary={company ? company : '---'} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Email />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Phone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Phone" secondary={phone ? phone : '---'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Location" secondary={location ? location : '---'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Time Zone" secondary={timezone ? timezone : '---'} />
        </ListItem>
      </List>
    </Card>
  )
}

export default EmployeeProfile
