import React from 'react';
import {useRouter} from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import * as Colors from '@mui/styles/colors';
// import MuiThemeProvider from '@mui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

}

// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: Colors.darkBlack,
//     primary1Color: Colors.white,
//     primary2Color: Colors.indigo700,
//     accent1Color: Colors.redA200,
//     pickerHeaderColor: Colors.darkBlack,
//   },
//   appBar: {
//     height: 60,
//   },
// });


const Header = ({imageLink}) => {

  const router = useRouter();

  const pages = ['drivers', 'constructors', 'circuits','championship/driver','championship/constructor'];
  const pagesNames = ['drivers', 'constructors', 'circuits','driver Championship','Constructor Championship'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  
  return (
    <Box className = "my-20" 
    sx={{ flexGrow: 1 }}>
      <AppBar 
      
      style={{ background: '#000000' }}
       position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src = {imageLink?imageLink:'/F1-logo.png'} height = "100px" width = "100px"/>
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesNames.map((pageName) => (
                <MenuItem key={pageName} onClick={handleCloseNavMenu}>
                  <Typography textAlign="end">{pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,i) => (
             
              
              // <Button
              //   key={page}
              //   onClick={() => router.push("/"+page)}
              //   sx={{ my: 2, color: 'white', display: 'block',border:"solid" }}
              // >
              //   {page}
              // </Button>
                
                <Button
                key={page}
                onClick={() => router.push("/"+page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pagesNames[i]}
              </Button>
              
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>)
};

export default Header;
