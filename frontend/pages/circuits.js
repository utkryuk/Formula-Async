import React from 'react';
import CircuitChart from '../charts/CircuitChart';
import Footer from '../components/Footer';
import Header from '../components/Header';

const constructors = () => {

  return <div>
    <Header />
      <CircuitChart/>
    <Footer />
  </div>;

};

export default constructors;
