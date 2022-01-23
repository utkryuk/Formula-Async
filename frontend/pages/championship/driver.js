import React from 'react';
import DriverChart from '../../charts/DriverChart';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Snowflake from '../../components/Snowflake';

const driver = () => {
  return <div>
    <Snowflake/>
    <Header imageLink='../F1-logo.png'/>
    <DriverChart/>
    <Footer/>
  </div>;
};

export default driver;
