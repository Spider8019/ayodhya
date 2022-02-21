import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ChangePageLanguage from "../dropdowns/ChangePageLanguage"
import Forecast from '../dialogs/Forecast'
import _ from "lodash"
import { useSession,signIn } from "next-auth/react"
import { Avatar } from '@mui/material'
import { defaultOptions } from '../../globalSetups/availableArrays'
import {  isMobile,isBrowser } from 'react-device-detect';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "../../styles/pages/Home.module.css"

const Navbar = () => {
    let  { t }= useTranslation()
    const router=useRouter()
    const { data: session, status } = useSession()


    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = () => (
      <ul 
          className={`${router.pathname.includes("/literature")&&"stickyNavbarLowerOne"} text-black sm:text-white bg-white sm:bg-amber-500 flex flex-col sm:flex-row w-full}`}
      >
          <li className={router.pathname == "/" ? "sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.home')}</a>
          </Link>
          </li>
          <li className={router.pathname == "/about" ? "sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/about">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.about')}</a>
          </Link>
          </li>
          <li className={router.pathname.includes("/tourism") ? "sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/tourism">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.tourism')}</a>
          </Link>
          </li>
          <li className={router.pathname.includes("/literature") ?"sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/literature">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.library')}</a>
          </Link>
          </li>
          <li className={router.pathname.includes("/talent") ? "sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/talent">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.talent')}</a>
          </Link>
          </li>
          <li className={router.pathname.includes("/audio") ? "sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/audio#player">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.music')}</a>
          </Link>
          </li>
          <li className={router.pathname.includes("/gallery") ? "sm:bg-amber-600 bg-amber-500" : ""}>
          <Link href="/gallery">
            <a className='px-4 sm:px-2 p-2 grid items-center  border-r-2 border-white'>{t('common:navbar.gallery')}</a>
          </Link>
          </li>
      </ul>
    );

    if (["/auth/signin","/signup","/dashboard","/dashboard/tabulate","/dashboard/blog","/dashboard/devLiterature","/dashboard/addEvent"].includes(router.pathname))
      return null;

    if(isBrowser){
        return (  
            <div className='flex flex-col'>
                <div className="sm:px-10 sm:py-4 flex justify-between sm:bg-white items-center">
                    <div className='flex items-center'>
                      <Image
                        layout='intrinsic'
                        height={90}
                        width={90}
                        src="/static/withOutBgLogo.png"
                        alt="Without Background Logo"
                      />
                      <h1 className="sm:text-4xl sm:ml-2">{t('common:title')}</h1>
                    </div>
                    <div className="flex">  
                      <ChangePageLanguage/>
                      <Forecast/>
                      {
                        (!session && status==='unauthenticated')
                        &&
                          <button 
                            aria-label="internationalizationButton"
                            className='basicDarkButton' 
                            style={{marginLeft:"1rem"}}
                            onClick={()=>signIn(null,{ callbackUrl: `${defaultOptions.baseUrl}/dashboard`})}
                          >Login</button>
                      }
                      {
                        session
                        &&
                          <Link 
                            passHref={true}
                            href="/dashboard">
                            <Avatar  
                              className="ml-2 cursor-pointer"
                            >
                                <Image src={session.user.image} alt={session.user.name} layout="fill" objectFit='cover' />
                            </Avatar>
                          </Link>
                      }
                    </div>
                </div>
                {list()}
                <style jsx>{`
                  .stickyNavbarLowerOne {
                    position:sticky;
                    top:0;
                  }
                `}</style>
            </div>
        )
      }
    
    if(isMobile){
      return (  
        <div>
            <div 
              className={`${styles.navbarContainer} p-4`}
            >
                <div className='flex items-center'>
                  <MenuIcon onClick={toggleDrawer("top", true)}/>
                  <h1 className={`${styles.navbarContainerHeading}`}
                  >{t('common:title')}</h1>
                </div>
                <div className="flex">
                  <ChangePageLanguage/>
                  {
                    (!session && status==='unauthenticated')
                    &&
                      <button 
                        aria-label="internationalizationButton"
                        className={isMobile?'basicButton':'basicDarkButton'}
                        style={{marginLeft:"1rem"}}
                        onClick={()=>signIn(null,{ callbackUrl: `${defaultOptions.baseUrl}/dashboard`})}
                      >Login</button>
                  }
                </div>
            </div>
            <div>
              {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                  >
                      {
                        session
                        &&
                          <div className="py-4 px-2 flex items-center">
                            <Link 
                              passHref={true}
                              href="/dashboard">
                              <Avatar  
                                className="ml-2 cursor-pointer"
                              >
                                  <Image quality={10} src={session.user.image} alt={session.user.name} layout="fill" objectFit='cover' />
                              </Avatar>
                            </Link>
                            <div className='ml-4'>
                              <p>{session.user.name}</p>
                              <p className='text-sm'>{session.user.email}</p>
                            </div>

                          </div>
                      }
                      <Divider/>
                      {list()}
                      <div className="italic px-2 py-4 text-sm text-right">
                        <p>Developed by </p>
                        <p>Spider8019</p>
                        <p>All rights reserved.</p>
                      </div>
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </div>

        </div>
      )
    }


    return null;
}

export default Navbar
