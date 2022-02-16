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

const Navbar = () => {
    let  { t }= useTranslation()
    const router=useRouter()
    const { data: session, status } = useSession()

    if (["/auth/signin","/signup","/dashboard","/dashboard/tabulate","/dashboard/blog","/dashboard/devLiterature"].includes(router.pathname))
      return null;

    return (  
        <div className='flex flex-col'>
            <div className="px-10 py-4 flex justify-between items-center">
                <div className='flex items-center'>
                  <Image
                    layout='intrinsic'
                    height={90}
                    width={90}
                    src="/static/withOutBgLogo.png"
                    alt="Without Background Logo"
                  />
                  <h1 className="text-4xl">{t('common:title')}</h1>
                </div>
                <div className="flex">
                  <ChangePageLanguage/>
                  <Forecast/>
                  {
                    (!session && status==='unauthenticated')
                    &&
                      <button 
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
                          className='cursor-pointer ml-2 border-2 border-amber-500'
                          alt={session.user.name}  
                          src={session.user.image} />
                      </Link>
                  }
                </div>
            </div>
            <ul 
              className={`${router.pathname.includes("/literature")&&"stickyNavbarLowerOne"} bg-amber-500 flex w-full}`}
            >
              <li className={router.pathname == "/" ? "bg-amber-600" : ""}>
               <Link href="/">
                 <a className='p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.home')}</a>
               </Link>
              </li>
              <li className={router.pathname == "/about" ? "bg-amber-600" : ""}>
               <Link href="/about">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.about')}</a>
               </Link>
              </li>
              <li className={router.pathname.includes("/tourism") ? "bg-amber-600" : ""}>
               <Link href="/tourism">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.tourism')}</a>
               </Link>
              </li>
              <li className={router.pathname.includes("/literature") ? "bg-amber-600" : ""}>
               <Link href="/literature">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.library')}</a>
               </Link>
              </li>
              <li className={router.pathname.includes("/talent") ? "bg-amber-600" : ""}>
               <Link href="/talent">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.talent')}</a>
               </Link>
              </li>
              <li className={router.pathname.includes("/audio") ? "bg-amber-600" : ""}>
               <Link href="/audio#player">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>Music</a>
               </Link>
              </li>
              <li className={router.pathname.includes("/gallery") ? "bg-amber-600" : ""}>
               <Link href="/gallery">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.gallery')}</a>
               </Link>
              </li>
            </ul>
            <style jsx>{`
              .stickyNavbarLowerOne {
                position:sticky;
                top:0;
              }
            `}</style>
        </div>
    )
}

export default Navbar
