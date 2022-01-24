

import { useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { Autocomplete, TextField } from '@mui/material';
import YearPicker from '../components/YearPicker';
import { Box } from '@mui/system';

const DriverVsDriver = () => {
  const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle' });
  const chartDiv = useRef(null);
  const chartId = ['83d9f351-c4c6-4bf4-97c7-dbe183185084', 'fddaf7cc-67ff-4159-b205-0eeef021ca1f'];

  const [drivers, setDrivers] = useState({ "driver1": "max_verstappen", "driver2": "hamilton" })
  const [year, setYear] = useState(new Date('2021-01-01'));
  const [filter, setFilter] = useState([
    {
      $match: {
        "year": 2021
      }
    },
    {
      $addFields: {
        "races": {
          $map: {
            input: "$races",
            as: "racer",
            in: {
              "round": "$$racer.round",
              "race_id": "$$racer.race_id",
              "racers": {
                $filter: {
                  input: "$$racer.racers",
                  as: "racer",
                  cond: {
                    $in: [
                      "$$racer.driverId",
                      ["hamilton", "max_verstappen"]
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  ]);
  
  const [rendered, setRendered] = useState(false);
  const [chart, setChart] = useState(sdk.createChart({ chartId: chartId[1], height: '700px', width: '1000px', theme: "dark", autoRefresh: true, filter: { "year": year.getFullYear()} }));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    setFilter({ "year": year.getFullYear() });
  }, [year]);

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  const updateDrivers = (event, newValue) => {
    event.preventDefault();
    if (event.target.id.includes("driver1input")){
      setDrivers({...drivers, "driver1": newValue});
    } else if (event.target.id.includes("driver2input")){
      setDrivers({ ...drivers, "driver2": newValue })
    }
    if (drivers.driver1 && drivers.driver2){
      const selected_drivers = Object.values(drivers).slice().sort();
      const queried_drivers = ["max_verstappen", "hamilton"]
      if(selected_drivers.length === queried_drivers.length && queried_drivers.slice().sort().every(
        function (value, index) {
        return value === selected_drivers[index];
      })
      ){
        setChart(sdk.createChart({ chartId: chartId[0], height: '700px', width: '1000px', theme: "dark", autoRefresh: true, filter: { "year": year.getFullYear() } }))
      }
    }
  }
  
  return (
    <div className = "h-screen w-screen bg-slate-300">
      
    <div className = "flex bg-slate-300 mt-20 mx-20">
      <div>
    <div className = "font-bold text-gray-600 mr-10 my-10">
      Compare 2 drivers of your choice based on their performance in a year
      </div>
            <div className="field">

            <Box className = "mt-5">

          <Autocomplete className="mb-4" disablePortal id="driver1input" onChange={updateDrivers} options={list_of_drivers} sx={{ width: 300 }} isOptionEqualToValue={(option, value) => option.label== value} defaultValue={"Lewis Hamilton"} renderInput={(params) => <TextField {...params} label="Driver 1" />} />
          <Autocomplete disablePortal id="driver2input" onChange={updateDrivers} options={list_of_drivers} sx={{ width: 300 }} isOptionEqualToValue={(option, value) => option.label == value} defaultValue={"Valtteri Bottas"} renderInput={(params) => <TextField {...params} label="Driver 2" />} />
          </Box>
          <div className = "mt-5">
          <YearPicker 
      
      year={year} setYear={setYear} minDate={new Date("2007-01-01")} />
        </div>
      </div>
      
      </div>
      <div className="chart mt-10 mx-5" ref={chartDiv} />
    </div>
    </div>
    );
}

const list_of_drivers = [{
  label: 'Lewis Hamilton',
  driverId: 'hamilton'
},
{
  label: 'Max Verstappen',
  driverId: 'max_verstappen'
},
{
  label: 'Valtteri Bottas',
  driverId: 'bottas',
},
{ 
  label: 'Lando Norris',
  driverId: 'norris'
},
{
  label: 'Sergio Pérez',
  driverId: 'perez'
}
];


export default DriverVsDriver;
