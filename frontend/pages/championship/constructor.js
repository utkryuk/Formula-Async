import React from 'react';
import ConstructorChart from '../../charts/ConstructorChart';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const constructor = () => {
  return <div>
    <Header imageLink='../F1-logo.png'/>
    <ConstructorChart/>
    <Footer/>
  </div>;
};

export default constructor;
