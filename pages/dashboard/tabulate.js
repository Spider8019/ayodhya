import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import {Chart} from "react-google-charts"
import styles from "../../styles/pages/Dashboard.module.css"
import { useSession,getSession } from 'next-auth/react';
import _ from "lodash"
import { Avatar } from '@mui/material';
import Image from 'next/image';
import useSWR from "swr";
import { getProfileDetails } from '../../globalSetups/api';

const Tabulate = ({user}) => {

  const {data:session,status}=useSession()
  const {data:profile,error}=useSWR("GetBasicDetail",()=>getProfileDetails({email:user && user.email}))

  const data = [
    [
      "Day",
      "Guardians of the Galaxy",
      "The Avengers",
      "aman"
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
  ];

  const options = {
    chart: {
      title: "Your Posts Insights",
      subtitle: "day wise"
    },
  };

  return (
  <div className='grid' style={{height:"calc(100vh - 2rem)",gridTemplateRows:"auto 1fr auto"}}>
  <div className="flex justify-between">
    <p className='text-2xl'>Tabulate</p>
    <div className='flex items-center'>
      <Avatar
        src={user.image}
        alt={user.name}
      />
      <p className='mx-4'>{session && session.user.name}</p>
    </div>
  </div>
  <div 
     className='grid my-12 items-center ' 
     style={{gridTemplateColumns:"auto 250px"}}
  >
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
     <div className={`pt-4 self-stretch rounded-2xl ml-4 ${styles.badgesContainer}` }>
        <p className='text-center'>Your Unlocks</p>
        <div>
          <div className={`p-2 rounded bg-white m-4 ${styles.badge}`}>
            Artist
          </div>
        </div>
     </div>
  </div>
  <div className="grid grid-cols-8 gap-4">
       {[{src:"/static/pages/tabulate1.png"},{src:"/static/pages/tabulate2.png"}].map((item,key)=>{
         return(
           <div
            key={key}
            style={{backgroundSize:"contain",boxShadow:"1px 1px 10px rgba(0, 0, 0, 0.164)"}}
            className="overflow-hidden h-32 rounded-xl grid place-items-center"
           >
              <Image 
                layout="intrinsic"
                height={150}
                width={150}
                src={item.src}
                alt={key}
              />
           </div>
         )
       })}
  </div>

  </div>

  )
  
};

Tabulate.Layout = DashboardLayout

export default Tabulate;

export async function  getServerSideProps(context){

  const session = await getSession(context)
  if(_.isNull(session)){
      return {
          redirect:{
              destination:`${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard/tabulate`,
              permanent:false
          }
      }
  }
  console.log(session)

  return {
      props:{
          user:session.user
      }
  }
}

