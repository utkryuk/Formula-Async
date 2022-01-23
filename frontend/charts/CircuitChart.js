import React, { useEffect, useRef, useState } from 'react'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'
import YearPicker from '../components/YearPicker';

const CircuitChart = () => {

  const temp = {
    '2022': '40d14cb1-ff4e-4381-8f9c-34c1df3c5149',
    '2021': '902a5827-31d3-462c-acb8-9f730995bc11',
    '2020': 'dca7bd7d-2bba-49f0-8529-6068f5bb18c3',
    '2019': 'f32c1060-2d21-4e8f-b202-0fa6b72c4b51',
    '2018': '9169f539-7f71-46e6-9d4e-9f25417b75ad',
    '2017': '9161e75c-e3a4-4cc9-900e-66789701b072',
    '2016': '493dfc57-4b62-4257-a6fb-02d174048f00'
  }
  const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle' })
  const chartDiv = useRef(null)
  const [year, setYear] = useState(new Date('2022-01-01'));
  const [rendered, setRendered] = useState(false);
  const [chart, setChart] = useState(sdk.createChart({ chartId: temp[year.getFullYear()], height: '700px', width: '800px', theme: "dark", autoRefresh: true}));

  useEffect(() => {
    if(!rendered){
      chart.render(chartDiv.current).then(() => setRendered(false)).catch(err => console.log("Error during Charts rendering.", err));
    }
  }, [chart]);

  useEffect(() => {
    setChart(sdk.createChart({ chartId: temp[year.getFullYear()], height: '700px', width: '1000px', theme: "dark", autoRefresh: true}))
  }, [year]);

  return (
  <div className="flex mt-10 justify-center align-middle">
    <div className="my-auto mx-10">
      <YearPicker year={year} setYear={setYear} minDate={new Date("2016-01-01")} maxDate={new Date("2022-01-01")} />
    </div>
    <div className="chart my-5" ref={chartDiv} />
  </div>
  )
};

export default CircuitChart;
