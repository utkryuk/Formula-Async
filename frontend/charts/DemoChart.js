import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
const DemoChart = () => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle'});
  const chartDiv = useRef(null);
  const chartId = '4d8805f3-7884-47bd-b261-a55d4d560164';
  // const height = '600px';
  // const width = '800px';
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: '600px', width: '800px', theme: "dark"}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);
  // useEffect(() => {
  //   if (rendered) {
  //     chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
  //   }
  // }, [chart, filter, rendered]);
  return <div className="chart" ref={chartDiv}/>;
}

export default DemoChart
