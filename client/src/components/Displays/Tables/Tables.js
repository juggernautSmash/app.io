import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import SwipeableViews from 'react-swipeable-views'

// local files
import './Tables.css'
import TableColumn from '../../Cards/TableColumn'
import TableContext from '../../../utils/TableContext'

const TableDisplay = _ => {

  const { tables } = React.useContext(TableContext)

  const onDragEnd = event => {
    console.log('onDragEnd event', event)
    // const { destination, source, draggableId } = event

    // if(!destination){ // nothing happened
    //   return
    // }

    // if( // if the item is dropped in the same place. do nothing
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ){
    //   return
    // }

    // const column = tables[source.droppableId]
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SwipeableViews>
        {
          tables.map( (table, i) => 
          <TableColumn
          key = {`table${i}`}
          tableId= {table._id}
          table={tables[i]}
          title = {table.title}
          tasks ={table.tasks}
          />
          ) //end map
        }
      </SwipeableViews>
    </DragDropContext>
  )


}

export default TableDisplay