import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import styles from "../../styles/Forecast.module.css"
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { IconButton,Skeleton } from '@mui/material';
import _ from 'lodash';
import Image from 'next/image';
import {AnimatePresence, motion} from 'framer-motion'
import { zeroHeightAndWidth,xMove } from '../../globalSetups/framer';

const Forecast = () => {

  const [weather,setWeather]=useState({weather:{},main:{}})
  const [show,setShow]=useState(false)

  const getForecast=async()=>{
    
    if(show===false){
      const res=await axios({
        method:"GET",
        url:"api/forecast",
      })
      if(res.data){
        setWeather({weather:{...res.data.weather[0]},main:{...res.data.main}})
      }
      else{
        console.log("Something went wrong.")
      }
    }
    setShow(!show)
  }


  return (
    <div className={styles.container}>
        <IconButton onClick={getForecast}>
          <AcUnitIcon className="dark:text-white"/>
        </IconButton>
        <AnimatePresence>
        {
          show
          &&
            <motion.div 
              initial="initial"
              exit="initial"
              animate="final"
              variants={zeroHeightAndWidth}
              className={`dialogBoxDefault ${styles.mainBox} dark:bg-black border dark:border-amber-800`}>
              <>
                <motion.div 
                variants={xMove}
                className={styles.image}>
                  <Image
                    layout="intrinsic" 
                    width={200}
                    height={200}
                    src={`http://openweathermap.org/img/wn/${weather.weather.icon}@4x.png`}
                    alt="Weather Status Image"
                  />
                </motion.div>
                <motion.div
                  variants={xMove}
                  className={styles.text}>
                  <p><span className="dark:text-amber-800">Detail</span>
                    <br/>
                    {weather.weather.main}
                  </p>
                  <p><span className="dark:text-amber-800">Temperature</span>
                    <br/>
                    {(weather.main.temp - 273.15).toFixed(1)+"°"}
                  </p>
                  <p><span className="dark:text-amber-800">Humidity</span>
                    <br/>
                    {weather.main.humidity}%
                  </p>
                  <p><span className="dark:text-amber-800">Pressure</span>
                    <br/>
                    {weather.main.pressure}hPa
                  </p>
                </motion.div>
              </>
            </motion.div>
        }
        </AnimatePresence>
    </div>)
};

export default Forecast;
