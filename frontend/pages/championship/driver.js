import React from 'react';
import DriverChart from '../../charts/DriverChart';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const driver = () => {
  return <div>
    <Header imageLink='../F1-logo.png'/>
    <DriverChart/>
    <Footer/>
  </div>;
};

export default driver;
