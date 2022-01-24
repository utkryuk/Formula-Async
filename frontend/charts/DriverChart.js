

import React, {useEffect, useRef, useState} from 'react';
import YearPicker from '../components/YearPicker';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const DriverChart = () => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle'});
  const chartDiv = useRef(null);
  const chartId = '1ea142fc-39cb-40ad-9cdf-7c60adc672fd';
  const [year, setYear] = useState(new Date('2021-01-01'));
  const [filter, setFilter] = useState({"year": year.getFullYear()});

  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: '800px', width: '900px', theme: "dark", autoRefresh: true, filter: filter}));

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

  return (
    <div className = "h-screen w-screen bg-slate-300">
      <div className = "flex mt-10 justify-center bg-slate-300">
      <div className = "mt-20 mx-10">
      <div className = "font-bold text-gray-600">
      Year Wise Performance of Drivers
      </div>
      <div className = "my-auto mx-5 mt-5">
        <YearPicker year={year} setYear={setYear} minDate={new Date("1980-01-01")}/>
      </div> 
      </div>
      
      <div className="chart mt-5" ref={chartDiv}/>
    
    </div>
    </div>);
}

export default DriverChart;
