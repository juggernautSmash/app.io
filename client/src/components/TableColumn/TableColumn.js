import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

// Material-UI components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

// Material-UI icons
import SaveIcon from '@material-ui/icons/Save';

// local CSS
import './TableColumn.css'

// local component
import TaskCard from '../TaskCard'
import TableOptions from '../TableOptions'

// Context
import TableContext from '../../utils/TableContext'

const TableColumn = props => {

  const { newTask, handleInputChange, handleAddTask } = React.useContext(TableContext)
  
  return (
      <Card 
        className="table"
        key={props.tableId}
        id={props.tableId}
      >
        <CardHeader 
          title={props.title}
          subheader={props.description}
          action={
            <IconButton aria-label="settings">
              <TableOptions title={props.title} tableId={props.tableId}/>
            </IconButton>
          }
        />
          <Droppable droppableId={props.tableId}>
             { (provided) => (
               <CardContent
                ref={provided.innerRef}
                { ...provided.droppableProps }
                >
                  { props.tasks.map( (task, i) => <TaskCard key={task._id} task={task} index={i}/> ) }
                  {provided.placeholder}
                </CardContent>
               )
              }
          </Droppable>
          <Card className="taskCard">
            <CardContent>
              <Input 
                placeholder="Add task"
                id="newTask"
                name="newTask"
                value={newTask}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                    >
                      <SaveIcon onClick={
                        (event) => {
                          event.preventDefault()
                          handleAddTask(props.tableId)
                        }
                      }/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </CardContent>
          </Card>
          
      </Card>
  ) // end return
}

export default TableColumn