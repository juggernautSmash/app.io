import React from 'react'

// Material-UI components
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal,
  Backdrop,
  Fade,
  Button
} from '@material-ui/core'

// Local files
import './Signup.css'
import SignupTab from '../../Tabs/SignupTab'

const useStyles = makeStyles(theme => ({
  modal: {
    justifyContent: 'center',
    position: 'absolute',
    overflow: 'scroll',
    height: '90vh',
    display: 'flex',
    width: '100%',
    marginTop: '5vh',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function Login() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="secondary" className="modalButton" type="button" onClick={handleOpen}>
        Signup
      </Button>
      <Modal
        id="js-focus-visible"
        disableAutoFocus="true"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div id="modalBody" className={classes.paper}>
            <SignupTab />
            <Button id="modalButton" type="button" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
