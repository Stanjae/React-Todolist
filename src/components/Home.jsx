import React from 'react'
import Navbar from './Navbar'
import { Box } from '@mui/material'
import Todo from './Todo'

const HomePage = () => {
  return (
    <Box sx={{backgroundColor: 'bgcolor.main' , height:'100vh'}}>
        <Navbar/>
        <Box sx={{my:6, py:6, display:'flex', justifyContent:'center' }}>
            <Todo/>
        </Box>
    </Box>
  )
}

export default HomePage