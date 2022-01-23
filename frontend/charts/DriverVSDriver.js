

import { useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { Autocomplete, TextField } from '@mui/material';
import YearPicker from '../components/YearPicker';
import { Box } from '@mui/system';

const DriverVsDriver = () => {
  const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle' });
  const chartDiv = useRef(null);
  const chartId = '1ea142fc-39cb-40ad-9cdf-7c60adc672fd';

  const [drivers, setDrivers] = useState({ "driver1": "max_verstappen", "driver2": "hamilton" })
  const [year, setYear] = useState(new Date('2021-01-01'));
  const [filter, setFilter] = useState([
    {
      $match: {
        "year": year.getFullYear()
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
                      Object.values(drivers)
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
  const [chart] = useState(sdk.createChart({ chartId: chartId, height: '600px', width: '800px', theme: "dark", autoRefresh: true, filter: filter }));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    setFilter({"year": year.getFullYear() });
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, year, rendered]);

  const updateDrivers = (event, newValue) => {
    event.preventDefault();
    console.log(newValue, event)
    if (event.target.id.includes("driver1input")){
      setDrivers({...drivers, "driver1": newValue});
    } else if (event.target.id.includes("driver2input")){
      setDrivers({ ...drivers, "driver2": newValue })
    }
    if (drivers.driver1 && drivers.driver2){

    }
  }
  
  return (
    <div>
      <div className="field">
        <Box>
          <Autocomplete disablePortal id="driver1input" onChange={updateDrivers} options={list_of_drivers} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Drivers" />} />
          <Autocomplete disablePortal id="driver2input" onChange={updateDrivers} options={list_of_drivers} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Drivers" />} />
        </Box>
      </div>
      <YearPicker year={year} setYear={setYear} />
      <div className="chart" ref={chartDiv} />
    </div>
    );
}

const list_of_drivers = [{
  label: 'Louis Hamilton',
  driverId: 'hamilton'
},
{
  label: 'Max Verstappen',
  driverId: 'max_verstappen'
},
];


export default DriverVsDriver;
