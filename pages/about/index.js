import React from 'react';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import Head from "next/head"
import {motion} from "framer-motion"
import dynamic from 'next/dynamic'
import {getCoordinates} from "../../globalSetups/api"

const MapDynamicComponent = dynamic(
  () => import('../../components/dynamic/map/AboutMap'),
  { ssr: false }
)

const index = ({coordinatesList}) => {
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
      <div className="h-2/4">
         <MapDynamicComponent list={coordinatesList}/>
      </div>
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

export async function getServerSideProps(context) {
   const coordinatesList=await getCoordinates()
   console.log(coordinatesList)
   return {
     props: { coordinatesList}, // will be passed to the page component as props
   }
 }

export default index;
