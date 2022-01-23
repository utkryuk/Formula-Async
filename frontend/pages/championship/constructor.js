import React from 'react';
import ConstructorChart from '../../charts/ConstructorChart';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Snowflake from '../../components/Snowflake';

const constructor = () => {
  return <div>
    <Snowflake/>
    <Header imageLink='../F1-logo.png'/>
    <ConstructorChart/>
    <Footer/>
  </div>;
};

export default constructor;
