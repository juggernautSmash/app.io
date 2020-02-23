import React from 'react'
import Moment from 'moment'
import { Draggable } from 'react-beautiful-dnd'

// Material-UI components
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

// Material-UI Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// local files
import './Task.css'
import EditTask from '../../Modals/EditTask'
import TableContext from '../../../utils/TableContext'

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  small: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))

const TaskCard = props => {

  console.log('TaskCard props', props)

  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const { handleDeleteTask } = React.useContext(TableContext)

  return (
    <Draggable draggableId={props.task._id} index={props.task.taskIndex}>
      {
        (provided) => (
          <Card key={props.task._id}
            id={props.task._id}
            className="taskCard"
            ref={provided.innerRef}
            { ...provided.draggableProps }
            { ...provided.dragHandleProps }
          > 
            <CardHeader
              title={props.task.task}
              subheader={props.task.description}
              action={
                props.task.assignedTo ? (
                  <Avatar className={classes.small} src={props.task.assignedTo.photoUrl}>
                    {/*  initials of assignedTo user if user photo doesn't exist */}
                  </Avatar>
                  ) : null
              }
              />
            <CardActions disableSpacing>
              {
                props.task.status ? (<Chip size="large" label={props.task.status} />) : <Chip size="large" label="QUEUED" />
              }
              
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Last Update: {Moment(props.task.lastUpdated).format('LLL')}
                </Typography>
                <Typography paragraph>
                  Due Date: {Moment(props.task.dueDate).format('LL')}
                </Typography>
                <CardActions disableSpacing>
                  <ButtonGroup variant="text" size="small"> 
                    <IconButton>
                      <EditTask task={props.task}/>
                    </IconButton>
                    <IconButton>
                      <HighlightOffIcon 
                        color="error" 
                        onClick={ event => {
                          event.preventDefault()
                          handleDeleteTask( props.task._id )
                        }} 
                      />
                    </IconButton>
                  </ButtonGroup>
                </CardActions>
              </CardContent>
            </Collapse>
          </Card>
        )
      }
    </Draggable>

  ) // end return
}

export default TaskCard