import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <div class="h-50 bg-gradient-to-b from-black to-black">
        <Box
        className = "flex"
        backgroundImage="Map.png"
        sx={{
          // bgcolor: 'background.paper',
          pt: 2,
          pb: 4,
        }}>
        {/* <Avatar
        className = "mx-auto"
          alt=""
          src="F1-logo.png"
          sx={{ width: 200, height: 140 }}
        /> */}
          <Container maxWidth="sm" className = "my-auto mx-auto">
          <h1 className="font-semibold text-5xl md:text-6xl lg:text-7xl height-10 width-10 text-white">
      Formula<span className = "text-red-700">Sync</span></h1>
            <div
            className = "flex">
            <Typography 
            className='text-white ml-60'
            variant="h5" align="end" color="text.secondary" paragraph>
              For the love of
            </Typography>
            <Avatar
        className = "mx-3"
          alt=""
          src="F1-logo.png"
          sx={{ width: 46, height: 32 }}
        />
           
            </div>
          </Container>
          <div className= "flex justify-center pb-20 mr-5">
            <img src = "image.jpg" height="700px"></img>
          </div>
        
          </Box>
        </div>  
      </main>
      {/* Footer */}
      
      {/* End footer */}
    </ThemeProvider>
  );
}