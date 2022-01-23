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
          <AcUnitIcon/>
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
              className={`dialogBoxDefault ${styles.mainBox}`}>
              {
                _.isEmpty(weather.weather) 
              ?
              <>
              <Skeleton animation="wave" height={140}/>
              <div className={styles.text} style={{marginLeft:"1rem"}}>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave"/>
              </div>
              </>
              :
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
                  <p><span>Detail</span>
                    <br/>
                    {weather.weather.main}
                  </p>
                  <p><span>Temperature</span>
                    <br/>
                    {(weather.main.temp - 273.15).toFixed(1)+"°"}
                  </p>
                  <p><span>Humidity</span>
                    <br/>
                    {weather.main.humidity}%
                  </p>
                  <p><span>Pressure</span>
                    <br/>
                    {weather.main.pressure}hPa
                  </p>
                </motion.div>
              </>
              }
            </motion.div>
        }
        </AnimatePresence>
    </div>)
};

export default Forecast;
