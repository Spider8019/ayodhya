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

const Navbar = () => {
    let  { t }= useTranslation()
    const router=useRouter()
    const { data: session, status } = useSession()
// console.log(session,status)

    if (["/auth/signin","/signup","/dashboard"].includes(router.pathname))
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
                        onClick={()=>signIn(null,{ callbackUrl: 'http://localhost:3000/dashboard'})}
                      >Login</button>
                  }
                  {
                    session
                    &&
                      <Avatar 
                        className='ml-2 border-2 border-amber-500'
                        alt={session.user.name}  
                        src={session.user.image} />
                  }
                </div>
            </div>
            <ul className="bg-amber-500 flex w-full">
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
              <li className={router.pathname == "/tourism" ? "bg-amber-600" : ""}>
               <Link href="/tourism">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.tourism')}</a>
               </Link>
              </li>
              <li className={router.pathname == "/onlinelibrary" ? "bg-amber-600" : ""}>
               <Link href="/onlinelibrary">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.library')}</a>
               </Link>
              </li>
              <li className={router.pathname == "/talent" ? "bg-amber-600" : ""}>
               <Link href="/talent">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.talent')}</a>
               </Link>
              </li>
              <li className={router.pathname == "/gallery" ? "bg-amber-600" : ""}>
               <Link href="/gallery">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.gallery')}</a>
               </Link>
              </li>
            </ul>
        </div>
    )
}

export default Navbar
