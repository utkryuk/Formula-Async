import React from 'react';
import ConstructorVsConstructor from '../charts/ConstructorVsConstructor';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Snowflake from '../components/Snowflake';

const constructors = () => {
  
  return <div>
    <Snowflake/>
    <Header/>
    <ConstructorVsConstructor />
    
    <Footer/>
    </div>;

};

export default constructors;
