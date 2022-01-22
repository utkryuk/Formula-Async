import {useState,ReactChild,useRef,useEffect} from 'react';
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
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const drivers = () => {
  const [driver1,setDriver1] = useState("")
  const [driver2,setDriver2] = useState("")
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle'});
  const chartDiv = useRef(null);
  const chartId = '4d8805f3-7884-47bd-b261-a55d4d560164';
  const [chart] = useState(sdk.createChart({chartId: chartId, height: '600px', width: '800px', theme: "dark"}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);
  // useEffect(() => {
  //   if (rendered) {
  //     chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
  //   }
  // }, [chart, filter, rendered]);

  
  // const height = '600px';
  // const width = '800px';
  const [rendered, setRendered] = useState(false);
  

  const HandleChangeDriver1 = ((event)=>{
    console.log(event.target.value);

  })
  const HandleChangeDriver2 = ((event)=>{
    console.log(event.target.value);
    
  })
  const handleSubmitButton =(()=>{

    
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);
  //   if (rendered) {
  //     chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
  //   }
  // }, [chart, filter, rendered]);
  
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
      onChange={(event, value) => setDriver1(event.target.value)}
      disablePortal
      id="driver1input"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Driver1"/>}
    />
  
      <Autocomplete
      onChange={(event, value) => setDriver2(event.target.value)}
      disablePortal
      id="driver2input"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Driver2"/>}
    />
    <Button onClick={handleSubmitButton} variant="outlined" color="secondary" >
        Submit
      </Button>
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
