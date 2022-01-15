import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';
import Link from "next/link"
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import ReactCountryFlag from "react-country-flag"


export default function BasicMenu() {

  const router=useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <TranslateIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languages.map(({code,country_code,language})=>{
          return(
            <MenuItem 
              key={code} 
              onClick={handleClose} 
              disabled={code===router.locale}>
              <Link 
                href={router.asPath}  
                locale={code}>
                <a className="flex items-center">
                <ReactCountryFlag countryCode={country_code} svg/>
                <p className="pl-2">{language}</p>
                </a>
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  );
}
