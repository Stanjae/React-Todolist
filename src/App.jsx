import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import HomePage from './components/Home';
import { NewContext } from './Contexto/NewContext';

const theme = createTheme({
  palette: {
   primary: {
      main: '#386BC0',
    },
    bgcolor:{
      main:'#EEEEEE',
    },
    neutral:{
      main:'#fff',
      alt:'#000000',
    }
  },
  typography: {
    subtitle1: {
      fontSize: '18px',
      lineHeight:'30.6px',
      letterSpacing:'normal'
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'regular',
    },
    h1:{
      fontWeight:'700',
      lineHeight:'70px',
      letterSpacing:'normal',
      fontSize:'65px',
      '@media (max-width:1200px)': {
        fontSize: '50px',
      },
    },
    h5:{
      fontSize:'25px',
      lineHeight:'30px',
      letterSpacing:'normal'
    }
  },
}); 




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <ErrorPage/>,
  },
]);

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <NewContext>
        <CssBaseline/>
        <RouterProvider router={router}/>
      </NewContext>
    </ThemeProvider>
    
    </>
  )
}

export default App
