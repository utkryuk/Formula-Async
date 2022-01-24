

import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { AppBar, MenuItem, Select } from '@mui/material';

const ConstructorChart = () => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle'});
  const chartDiv = useRef(null);
  const chartId = '729eeced-ed75-4da8-b991-75e8ae91c8b2';
  const [filter, setFilter] = useState(
    {year:2021
    });

  var set_of_years = []
  for(var i= 2000 ; i < 2022; i+=1 ){
    set_of_years.push(i)
  }

  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: '700px', width: '900px', theme: "dark", autoRefresh: true, filter: filter}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  const handleChange = (event) => {
    event.preventDefault();
    setFilter({"year": event.target.value})
  }

  return (
    <div className = "flex mt-10 justify-center align-middle bg-slate-300">
      <div className='my-auto mx-10'>
      {/* <ThemeProvider theme={theme}>
        <AppBar title="Driver Charts" style={ { background: "#f57f17" }} titleStyle = { { color: "#ff5252" }} showMenuIconButton={false}/> */}
         <Select 
         className = "px-5"
          value={filter.year}   
          onChange={handleChange}   
         >
           {
            set_of_years.map((item, index) => {
             return <MenuItem value={item} key={index}>{item}</MenuItem>
           })}

        </Select>
        </div>
        {/* </ThemeProvider> */}
      <div className="chart my-5" ref={chartDiv}/>
    </div>);
}

export default ConstructorChart;
