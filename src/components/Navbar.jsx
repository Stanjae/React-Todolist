import  React,{useState, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import Geogle from '../assets/react.svg'
import { AppContext } from '../Contexto/NewContext';

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const {SigninwithGoo, SignoutWithGoo, myCredentials} = useContext(AppContext)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stanjhae Todolist
          </Typography>
        {!myCredentials.loggedIn ? 
          <Button onClick={SigninwithGoo} endIcon={<img style={{width:'30px'}} src={Geogle} />} variant='outlined' color="inherit">Sign-in with Google</Button>
            :
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={myCredentials?.photo} />
                <Typography px={1.5} variant="body1" color={'neutral.main'} component="div" sx={{ flexGrow: 1 }}>
            {myCredentials?.displayName}
          </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={SignoutWithGoo} endIcon={<img style={{width:'30px'}} src={Geogle} />} variant='outlined' color="inherit">Signout </Button>
                </MenuItem>
            </Menu>
          </Box>
          }
        </Toolbar>
    </AppBar>
    </Box>
  );
}
