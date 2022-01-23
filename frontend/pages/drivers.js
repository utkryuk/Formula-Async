import React from 'react'
import DriverVsDriver from '../charts/DriverVSDriver'
import Footer from '../components/Footer';
import Header from '../components/Header';

const drivers = () => {
  return (
    <div>
      <Header/>
      <DriverVsDriver/>
      <Footer/>
    </div>
  )
}

export default drivers;
