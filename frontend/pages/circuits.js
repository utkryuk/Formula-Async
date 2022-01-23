import React from 'react';
import CircuitChart from '../charts/CircuitChart';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Snowflake from '../components/Snowflake';

const constructors = () => {

  return <div>
    <Snowflake/>
    <Header />
      <CircuitChart/>
    <Footer />
  </div>;

};

export default constructors;
