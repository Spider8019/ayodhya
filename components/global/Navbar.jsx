import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Link from 'next/link'
import ChangePageLanguage from "../dropdowns/ChangePageLanguage"
import Forecast from '../dialogs/Forecast'

const Navbar = () => {
    let  { t }= useTranslation()

    return (
        <div className='flex flex-col'>
            <div className="p-10 flex justify-between items-center">
                <h1 className="text-4xl">{t('common:home_page_title')}</h1>
                <div className="flex">
                  <ChangePageLanguage/>
                  <Forecast/>
                </div>
            </div>
            <div className="bg-amber-500 flex w-full">
               <Link href="/">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.home')}</a>
               </Link>
               <Link href="/about">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.about')}</a>
               </Link>
               <Link href="/tourism">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.tourism')}</a>
               </Link>
               <Link href="/onlinelibrary">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.library')}</a>
               </Link>
               <Link href="/onlinelibrary">
                 <a className=' p-2 grid items-center  border-r-2 text-white border-white'>{t('common:navbar.talent')}</a>
               </Link>
            </div>
        </div>
    )
}

export default Navbar
