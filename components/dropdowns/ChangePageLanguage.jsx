import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';
import Link from "next/link"
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import ReactCountryFlag from "react-country-flag"
import styles from "../../styles/Forecast.module.css"


export default function BasicMenu() {

  const router=useRouter()
  const [show, setShow] = React.useState(false);

  const languages=[{
    code:"hn",
    language:"हिन्दी",
    country_code:"IN"
  },{
    code:"en-US",
    language:"English",
    country_code:"GB"
  }]

  return (
    <div className={styles.container}>
      <IconButton
        onClick={()=>setShow(!show)}
      >
        <TranslateIcon/>
      </IconButton>
      {
        show 
        &&
        <div className={`dialogBoxDefault ${styles.mainBox}`}
             style={{width:"fit-content",gridTemplateColumns:"1fr"}}
        >
          {languages.map(({code,country_code,language})=>{
            return(
                <Link 
                  key={code} 
                  href={router.asPath}  
                  locale={code}>
                  <a 
                  className={(code===router.locale)?"flex items-center pr-4 opacity-50  ":"flex items-center pr-4 opacity-100"}

                  // className=""
                  >
                    <ReactCountryFlag countryCode={country_code} svg/>
                    <p className="pl-2">{language}</p>
                  </a>
                </Link>
            )
          })}
        </div>
      }
    </div>
  );
}
