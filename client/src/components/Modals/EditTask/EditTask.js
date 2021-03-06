import React from 'react'
import PropTypes from 'prop-types'

// Material-UI components
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { 
  Modal,
  Backdrop,
  ListItemText,
  FormControl, 
  FormHelperText, 
  Input, 
  InputLabel, 
  TextField,
  Button, 
  CircularProgress  
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
  
  // Material-UI icons
import EditIcon from '@material-ui/icons/Edit'

// Material-UI modal aniation
import { useSpring, animated } from 'react-spring'

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

const statusOptions = [
  { status: 'QUEUED', color: 'text.disabled' },
  { status: 'IN PROGRESS', color: 'warning.main' },
  { status: 'STUCK!', color: 'error.main' },
  { status: 'DONE', color:'success.main' }
]

const EditTask = props => {

  const styles = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { 
    task, 
    description, 
    dueDate, 
    isLoading, 
    handleInputChange, 
    handleUpdateTask,
    handleAutoCompleteValue } = React.useContext(TableContext)

  return (
    <>
      <ListItemText onClick={handleOpen}>
        <EditIcon />
      </ListItemText>
      <Modal
        disableEnforceFocus 
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
              <h1>Edit Task </h1>
              <h3>{props.task.task}</h3>
              <div>
                <FormControl>
                  <InputLabel htmlFor="task">Task</InputLabel>
                  <Input
                    id="task"
                    name="task"
                    placeholder={props.task.task}
                    aria-describedby="task-helper-text"
                    onChange={handleInputChange}
                    value={task || props.task.task}
                  />
                  <FormHelperText id="task-helper-text"></FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input
                    multiline
                    id="description"
                    name="description"
                    placeholder={props.task.description}
                    aria-describedby="description-helper-text"
                    onChange={handleInputChange}
                    value={description || props.task.description}
                  />
                  <FormHelperText id="description-helper-text"></FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel htmlFor="dueDate">Due Date</InputLabel>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    placeholder={props.task.dueDate}
                    aria-describedby="dueDate-helper-text"
                    onChange={handleInputChange}
                    value={dueDate || props.task.dueDate}
                  />
                  <FormHelperText id="dueDate-helper-text"></FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <Autocomplete
                    id="status"
                    name="status"
                    placeholder={props.task.status}
                    // value={status}
                    style={{ width: 200 }}
                    options={statusOptions}
                    getOptionLabel={option => option.status}
                    onInputChange={ (event, value, reason) => {
                      handleAutoCompleteValue('status',value)
                    }}
                    renderInput={params => (
                      <TextField 
                        {...params} 
                        fullWidth 
                        label="Status"   
                      />
                    )}
                  />
                  {/* <InputLabel htmlFor="status">Status</InputLabel>
                  <Input
                    id="status"
                    name="status"
                    aria-describedby="description-helper-text"
                    onChange={handleInputChange}
                    value={status}
                  />
                  <FormHelperText id="description-helper-text"></FormHelperText> */}
                </FormControl>
              </div>
              <div className={styles.wrapper}>
                <Button
                  disabled={isLoading}
                  onClick={event => {
                    event.preventDefault()
                    handleUpdateTask(props.task._id)
                    handleClose()
                    // window.location.reload(false)
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

export default EditTask