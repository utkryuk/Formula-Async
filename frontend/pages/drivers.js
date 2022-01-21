import {useState,React} from 'react';
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const drivers = () => {
  const [driver1,setDriver1] = useState("")
  const [driver2,setDriver2] = useState("")

  const HandleChange = ((event)=>{

  })
  return <div>
        Drivers
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
      <Autocomplete
      disablePortal
      id="driver1input"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  
      <Autocomplete
      disablePortal
      id="driver2input"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />

        </Box>
    </div>;

};
const top100Films = [
  { label: 'Louis Hamilton', year: 1994 },
  { label: 'Max Verstappen', year: 1972 },
  { label: 'Valerie Bottas', year: 1974 },
  { label: 'Mick Schumacker', year: 2008 },
  { label: 'Sergio Perez', year: 1957 },
  { label: "Sebastian Vettel", year: 1993 }
];

export default drivers;
