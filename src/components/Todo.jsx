import { ListAlt } from '@mui/icons-material'
import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { CreateTodo } from './CreateTodo';
import {AppContext } from '../Contexto/NewContext';
import {v4 as uuid} from 'uuid'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.neutral.alt,
      fontSize:17,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Todo = () => {
  const {todoList, setNewTodo, myCredentials, DeleteDoc} = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [actionState, setActionState] = useState(true);


    const handleOpen = () => {
      setOpen(true);
      setActionState(true);
      const yung = {userid: myCredentials?.userId, id: uuid(), title:'', priority:'Low Priority', status:'Pending', date:new Date()}
      setNewTodo(yung);
      
      
    };

    const handleClose = () => setOpen(false)
  
  const DeleteClick =(id)=>{
    /* const olo = todoList.filter(todo => todo.id !== id);
    setTodoList(olo); */
    DeleteDoc(id);

  }

  const UpdateClick=(id)=>{
    const told = todoList.find(todo => todo.id === id)
    setNewTodo(told);
    setOpen(true);
    setActionState(false);
  }

  return (
    <Paper sx={{ width: "60%", borderRadius: "0.8rem", py: 2 }} elevation={2}>
      <CreateTodo handleClose={handleClose} actionState={actionState}  open={open}/>
      <Stack px={3} py={1} spacing={1} direction={'row'} alignItems={'center'} alignContent={'center'} justifyContent={'space-between'} sx={{}}>
          <Typography gutterBottom variant="h5">
            <ListAlt /> TodoList
          </Typography>
          {myCredentials.loggedIn && <Button onClick={handleOpen}  variant='contained'>Create Task</Button>}
      </Stack>
      
      <Divider light />
      <Box sx={{py:3, overflowY:'scroll', height:'500px'}}>
        {!myCredentials.loggedIn ?
        <Typography variant='h4' fontWeight={700} mt={'20%'} textAlign={'center'} component={'div'} gutterBottom color={'error'}>You are not Logged in!</Typography>
        :
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell sx={{width:'10%'}} >ID</StyledTableCell>
                <StyledTableCell align='left'>Title</StyledTableCell>
                <StyledTableCell align="right">Priority</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Chip size='small' color={row.priority === 'Low Priority' ? 'info': 'error'} label={row.priority}/>
                    </StyledTableCell>
                  <StyledTableCell align="right">
                    <Chip size='small' color={row.status === 'Pending' ? 'warning': 'success'} label={row.status}/>  
                    </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={()=> UpdateClick(row.id)} size='small'>Edit</Button>
                    <Button onClick={()=> DeleteClick(row.todo_id)} size='small' color='error' variant='contained'>Delete</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}
      </Box>
    </Paper>
  );
}

export default Todo
