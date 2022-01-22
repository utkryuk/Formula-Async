import React from 'react';
import ConstructorChart from '../charts/ConstructorChart';
import Footer from '../components/Footer';
import Header from '../components/Header';

const constructors = () => {
  return <div>
    <Header/>
    <ConstructorChart/>
    Constructors
    <Footer/>
    </div>;

};

export default constructors;
