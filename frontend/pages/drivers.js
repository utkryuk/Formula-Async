import React from 'react'
import DriverVsDriver from '../charts/DriverVSDriver'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Snowflake from '../components/Snowflake';

const drivers = () => {
  return (
    <div>
      <Snowflake/>
      <Header/>
      <DriverVsDriver/>
      <Footer/>
    </div>
  )
}

export default drivers;
