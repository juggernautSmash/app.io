import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { 
  Modal,
  Backdrop,
  FormControl,
  ListItemText,
  Button, 
  CircularProgress, 
  TextField } from '@material-ui/core'

// Context
import TableContext from '../../utils/TableContext'


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


const AssignedToModal = _ => {
  
  const styles = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  const { name, isLoading, handleInputChange } = React.useContext(TableContext)

    const getEmployees = _ => {
      let employees = []
    
      axios.get(``)
      
    }

  return (
    <>
      <ListItemText primary='Assign Task' onClick={handleOpen} />
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
                <h1>Assign To</h1>
                <FormControl>
                  <TextField
                    id="name"
                    name="name"
                    aria-describedby="name-helper-text"
                    onChange={handleInputChange}
                    value={title}
                  />
                </FormControl>
              </div>
              <div className={styles.wrapper}>
                <Button
                  disabled={isLoading}
                  onClick={event => {
                    handleSubmitTable(event)
                    window.location.reload(false)
                  }}
                >
                  Submit
                </Button>
                {isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  )

}

export default AssignedToModal