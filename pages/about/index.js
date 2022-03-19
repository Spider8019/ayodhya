import React from 'react';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import Head from "next/head"
import {motion} from "framer-motion"

const index = () => {
  return <motion.div 
   className="m-4 sm:m-20">
      <Head>
          <title>About Page - Ikshvaku</title>
      </Head>
      <p className='text-2xl mb-8'>Ayodhya Oudh Awadh</p>
      <div className='text-xl my-8'>
          <p>Who is Ikshvaku</p>
          <p className='text-sm'>He is the founder and first king of Ikshvaku dynasty or Suryavansha (The Solar Dynasty)</p>
       </div>
       <iframe 
        className='w-full rounded'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28492.600436315875!2d82.18161529609863!3d26.78981242771759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07937e6d2823%3A0x5fc8f683b17f222b!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1644228976225!5m2!1sen!2sin" height="450" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
       <div className='text-xl mt-8'>
          <p>Geographic</p>
          <p></p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-12">
             <div className="rounded grid place-items-center p-8 dark:bg-amber-800 bg-amber-50">
                <AgricultureIcon style={{fontSize:"4rem"}}/>
                <p className='text-sm'>1272 villages</p>
             </div>
             <div className="rounded grid place-items-center p-8 dark:bg-amber-800 bg-amber-50">
                <HolidayVillageOutlinedIcon style={{fontSize:"4rem"}}/>
                <p className='text-sm'>1 Nagar Nigam</p>
             </div>
             <div className="rounded grid place-items-center p-8 dark:bg-amber-800 bg-amber-50">
                <LocalPoliceIcon style={{fontSize:"4rem"}}/>
                <p className='text-sm'>18 Police Station</p>
             </div>
             <div className="rounded grid place-items-center p-8 dark:bg-amber-800 bg-amber-50">
                <ExtensionOutlinedIcon style={{fontSize:"4rem"}}/>
                <p className='text-sm'>4 Nagar Nikay</p>
             </div>
          </div>
       </div>
       <div className='text-xl mt-8'>
          <p>History</p>
          <p></p>
       </div>
  </motion.div>;
};

export default index;
