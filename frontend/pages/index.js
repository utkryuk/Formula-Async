import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import DemoChart from '../charts/DemoChart'
import Album from '../components/themex'
import {useRouter} from 'next/router';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { style } from '@mui/system'
import Snowflake from '../components/Snowflake'

export default function Home() {
  const router = useRouter();

  const HandleClick = (str)=>{
    router.push(str);
  }
  return (
    <div >
      <Snowflake/>
      <Header/>
      <Album/>
      
      <Footer/>
      {/* Drivers */}
        {/* <a onClick={() => router.push("/drivers")}>Drivers vs Drivers</a>

      {/* Constructors */}
        {/* <a onClick={() => router.push("/constructors")}>Constructors vs Constructors</a>

      {/* Display Driver Chart */}
        {/* <a onClick={() => router.push("/championship/driver")}>Display ChampionShip Points</a> */}
        
      {/* Circuits */}
        {/* <a onClick={() => router.push("/circuits")}>Circuits Year Wise</a> */} 

    </div>
  )
}
