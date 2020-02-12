import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TaskContext from '../../utils/TaskContext'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Board from 'react-trello'
import TableContext from '../../utils/TableContext'

import { Carousel } from 'react-responsive-carousel'
import { CardHeader, CardActionArea } from '@material-ui/core';

import './TableDisplay.css'

const TableDisplay = () => {

  const {
    boardTitle,
    boardDescription,
    tables,
  } = React.useContext(TableContext)

  console.log(` Context states are...
  boardTitle: ${boardTitle}
  boardDescription: ${boardDescription}
  `)

  return (

    <div>
      <Card className="boardTitle">
        <CardHeader 
          title={boardTitle}
          subheader={boardDescription}
        />
      </Card>
      <Carousel showThumbs={false} >
        {
          tables.map( table => 
            <div>
              <Card>
                <CardHeader 
                  title={table.title}
                />
                <CardActionArea>

                </CardActionArea>
              </Card>
            </div>
            )
        }
      </Carousel>
    </div>
    
    // <Card className="table" variant="outlined">

    //   <CardContent>
    //     <Typography variant="h5" component="h2">
    //       {title}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <TableContainer component={Paper}>
    //       <Table className={classes.table} aria-label="simple table">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell align="center">{title}</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {/* body */}
    //           <TableRow>
    //           <TableCell align="left">Owner: <Button variant="outlined" align="right" size="small">{owner}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Status:<Button variant="outlined" align="right" size="small">{status}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Task:<Button variant="outlined" align="right" size="small">{task}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Due date:<Button variant="outlined" align="right" size="small">{dueDate}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Text:<Button variant="outlined" align="right" size="small">{text}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Timeline:<Button variant="outlined" align="right" size="small">{timeline}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Assigned:<Button variant="outlined" align="right" size="small">{assigned}</Button></TableCell></TableRow>
    //           <TableRow>
    //           <TableCell align="left">Priority:<Button variant="outlined" align="right" size="small">{priority}</Button></TableCell></TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>

    //   </CardActions>

    // </Card>

  )
}

export default TableDisplay

{/* <Button size="small">{status}</Button>
  <Button size="small">{owner}</Button>
  <Button size="small">{task}</Button>
  <Button size="small">{assigned}</Button>
  <Button size="small">{dueDate}</Button>
  <Button size="small">{priority}</Button>
  <Button size="small">{status}</Button>
  <Button size="small">{text}</Button>
  <Button size="small">{timeline}</Button> */}