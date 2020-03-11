import React from 'react'
import PropTypes from 'prop-types'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { 
  Button, 
  Modal, 
  Backdrop, 
  ListItemText
 } from '@material-ui/core'

// Material-UI modal animation
import { useSpring, animated } from 'react-spring' // web.cjs is required for IE 11 support

// Local files
import TableContext from '../../../utils/TableContext'


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

const DeleteTable = props => {

  const styles = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { handleDeleteTable } = React.useContext(TableContext)

  return (
    <>
      <ListItemText primary='Delete Table' onClick={handleOpen} />
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
            <p>Are you sure you want to delete this table?</p>
            <Button onClick={ (event) => {
              event.preventDefault()
              handleDeleteTable(props.tableId)
              handleClose()
              // window.location.reload(false)
              }
            }>
              Yes
            </Button>
            <Button onClick={handleClose}>
              No
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  )

}

export default DeleteTable