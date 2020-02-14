import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import SwipeableViews from 'react-swipeable-views'

// local components
import TableColumn from '../TableColumn'

// context
import TableContext from '../../utils/TableContext'

const TableDisplay = _ => {

  const { tables } = React.useContext(TableContext)

  const onDragEnd = e => {
    console.log('onDragEnd triggered', e)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        {
          tables.map( (table, i) => 
          <TableColumn
          key = {`table${i}`}
          tableId= {table._id}
          title = {table.title}
          tasks ={table.tasks}
          />
          ) //end map
        }
    </DragDropContext>
  )


}

export default TableDisplay