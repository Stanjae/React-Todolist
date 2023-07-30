import Backdrop from '@mui/material/Backdrop';
import {Modal, Box, Typography, TextField, MenuItem, Button, Stack} from '@mui/material/';
import Fade from '@mui/material/Fade'
import { useContext } from 'react';
import { AppContext } from '../Contexto/NewContext';
import {v4 as uuid} from 'uuid'


const style = {
    position: 'absolute', top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  const statuso = [
    {
      value: 'Pending',
      label: 'Pending',
    },
    {
      value: 'Finished',
      label: 'Finished',
    },
   
  ];

  const priority = [
    {
      value: 'High Priority',
      label: 'High Priority',
    },
    {
      value: 'Low Priority',
      label: 'Low Priority',
    },
   
  ];

export function CreateTodo({open, handleClose, actionState}) {
    const {todoList, newTodo, setNewTodo, setTodoList, myCredentials, AddTodolist, UpdateDoc} = useContext(AppContext);

    //{id: uuid(), title:'', priority:'', status:'', date:new Date()}

    const HandleType =(e)=>{
        setNewTodo(prevNewTodo => ({...prevNewTodo, [e.target.name]:e.target.value} ))
    }

    const AddHandle =(e)=>{
        e.preventDefault();
        /* setTodoList(prevTodoList => [...prevTodoList, newTodo]) */
        AddTodolist()
        setNewTodo({userid: myCredentials?.userId, id: uuid(), title:'', priority:'Low Priority', status:'Pending', date:new Date()});
        handleClose();
    }

    const UpdateTask =(e)=>{
        e.preventDefault();
       /*  const tasks = todoList.map((todo) =>{
            if(todo.id === newTodo.id){
                return {...todo, title:newTodo.title, priority:newTodo.priority, status:newTodo.status}
              }
              return todo
        }) */
        // setTodoList(tasks)
        UpdateDoc(newTodo.todo_id);
        handleClose();
    }

    console.log(todoList);

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open} onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
               {actionState ? 'Create a Task' : 'Update a Task'}
              </Typography>
              {actionState ?
              <Box component={'form'} onSubmit={AddHandle}>
                <TextField onChange={HandleType} value={newTodo.title} name='title' required margin='normal' size='small' fullWidth label="Title" id="fullWidth" />
                <TextField onChange={HandleType} name='status' id="status"
                    select required size='small' margin='normal' label="Select a Status" value={newTodo.status}>
                    {statuso.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div>
                    <TextField onChange={HandleType} name='priority' id="priority"
                        select required size='small' margin='normal' label="Select a Priority" value={newTodo.priority}>
                        {priority.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Stack direction={'row'} justifyContent={'flex-end'}>
                    <Button type='submit' size='large' variant='contained'>Submit</Button>
                </Stack>
                    
              </Box>
              :
              <Box component={'form'} onSubmit={UpdateTask}>
              <TextField onChange={HandleType} value={newTodo.title} name='title' required margin='normal' size='small' fullWidth label="Title" id="fullWidth" />
              <TextField onChange={HandleType} name='status' id="status"
                  select required size='small' margin='normal' label="Select a Status" value={newTodo.status}>
                  {statuso.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                      {option.label}
                      </MenuItem>
                  ))}
              </TextField>
              <div>
                  <TextField onChange={HandleType} name='priority' id="priority"
                      select required size='small' margin='normal' label="Select a Priority" value={newTodo.priority}>
                      {priority.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                          {option.label}
                          </MenuItem>
                      ))}
                  </TextField>
              </div>
              <Stack direction={'row'} justifyContent={'flex-end'}>
                  <Button type='submit' size='large' variant='contained'>Submit</Button>
              </Stack>
                  
            </Box>
            }

            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }