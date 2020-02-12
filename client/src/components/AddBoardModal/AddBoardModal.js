import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import ListItemText from '@material-ui/core/ListItemText'
import { FormControl, FormHelperText, Input, InputLabel, Button, CircularProgress } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

import { useSpring, animated } from 'react-spring' // web.cjs is required for IE 11 support

import BottomBarContext from '../../utils/BottomBarContext'
import './AddBoardModal.css'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}))

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
}

const AddBoardModal = _ => {

  const styles = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { title, description, isLoading, isSuccess, errors, handleInputChange, handleSubmitBoard, displayError } = React.useContext(BottomBarContext)

  return (
    <>
      <ListItemText primary='Add Board' onClick={handleOpen} />
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={styles.paper}>
            <form>
              <div>
                <h1>Add a Board</h1>
                <FormControl>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input
                    id="title"
                    name="title"
                    aria-describedby="title-helper-text"
                    onChange={handleInputChange}
                    value={title}
                    error={
                      errors.some(e => (e.message.toLowerCase().includes('title')) ? true : false)
                    }
                  />
                  <FormHelperText id="title-helper-text">{errors && displayError(errors)}</FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input
                    multiline
                    id="description"
                    name="description"
                    aria-describedby="description-helper-text"
                    onChange={handleInputChange}
                    value={description}
                  />
                  <FormHelperText id="description-helper-text"></FormHelperText>
                </FormControl>
              </div>
              <div className={styles.wrapper}>
                <Button
                  disabled={isLoading}
                  onClick={event => {
                    handleSubmitBoard(event)
                    window.location.reload(false)
                  }}
                >
                  Submit
                </Button>
                {isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
                {isSuccess && handleClose}
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  )

}

export default AddBoardModal