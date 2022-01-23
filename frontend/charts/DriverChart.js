

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
  const [chart] = useState(sdk.createChart({chartId: chartId, height: '700px', width: '800px', theme: "dark", autoRefresh: true, filter: filter}));

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
    <div className = "flex mt-10 justify-center align-middle bg-slate-400">
      <div className = "my-auto mx-10">
        <YearPicker year={year} setYear={setYear} minDate={new Date("1980-01-01")}/>
      </div> 
      <div className="chart my-5" ref={chartDiv}/>
    </div>);
}

export default DriverChart;
