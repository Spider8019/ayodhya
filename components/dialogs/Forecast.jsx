import React,{useState} from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import styles from "../../styles/Forecast.module.css"
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { IconButton,Skeleton } from '@mui/material';
import _ from 'lodash';
import Image from 'next/image';

const Forecast = () => {

  const [weather,setWeather]=useState({weather:{},main:{}})
  const [show,setShow]=useState(false)

  const getForecast=async()=>{
    setShow(!show)
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

  return (
    <div className={styles.container}>
        <IconButton onClick={getForecast}>
          <AcUnitIcon/>
        </IconButton>
        {
          show
          &&
              <div className={`dialogBoxDefault ${styles.mainBox}`}>
              {
                _.isEmpty(weather.weather) 
              ?
              <>
              <Skeleton animation="wave"/>
              <div className={styles.text} style={{marginLeft:"1rem"}}>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave"/>
              </div>
              </>
              :
              <>
                <div className={styles.image}>
                  <Image
                    layout="intrinsic" 
                    width={200}
                    height={200}
                    src={`http://openweathermap.org/img/wn/${weather.weather.icon}@4x.png`}
                    alt="Weather Status Image"
                  />
                </div>
                <div className={styles.text}>
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
                </div>
              </>
              }
            </div>
        }
    </div>)
};

export default Forecast;
