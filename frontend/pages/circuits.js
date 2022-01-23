import React, { useEffect, useRef, useState } from 'react'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'
import { Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const circuits = () => {

  const temp = {
    '2022': '40d14cb1-ff4e-4381-8f9c-34c1df3c5149',
    '2021': '902a5827-31d3-462c-acb8-9f730995bc11',
    '2020': 'dca7bd7d-2bba-49f0-8529-6068f5bb18c3',
    '2019': 'f32c1060-2d21-4e8f-b202-0fa6b72c4b51',
    '2018': '9169f539-7f71-46e6-9d4e-9f25417b75ad',
    '2017': '9161e75c-e3a4-4cc9-900e-66789701b072',
    '2016': '493dfc57-4b62-4257-a6fb-02d174048f00'
  }
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle'})
  const chartDiv = useRef(null)

  const years = [('1', '2022'), ('2','2021'), ('3', '2020'), ('4', '2019'), ('5', '2018'), ('6', '2017'), ('7', '2016')]
  const [year, setYear] = useState('')  
  const [chart, setChart] = useState(null)

  useEffect(() => {
    if (chart != null) {
      chart.render(document.getElementById('mycharts'))
      .catch(() => console.log("Charts failed to load"))  
    }
  }, [chart])

  const handleYearChange = (event) => {
    console.log(event.target.value)
    setYear(event.target.value)
  }
  
  const handleSubmitButton = (event) => {
    event.preventDefault()
    if (year != '') {
      setChart(sdk.createChart({ chartId: temp[year], height: '600px', width: '1200px', theme: 'light'}))
  
      console.log(event.target.value)  
    }
  }

  return (
    <div>
      <Header/>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          onChange={handleYearChange}
        >
          {years.map((curYear, key) => {
            return <MenuItem key = {key} value = {curYear}>{curYear}</MenuItem>
          })}
        </Select>
      </FormControl>
        <Button variant="outlined" color="success" onClick = {handleSubmitButton}>
          Submit
        </Button>
        <div id = "mycharts"></div>
        <Footer/>
        {/* <div className='chart' ref={chartDiv} /> */}
    </div>
  )
  
};

export default circuits
