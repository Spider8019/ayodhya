import React,{useRef} from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import {Chart} from "react-google-charts"
import styles from "../../styles/pages/Dashboard.module.css"
import { useSession,getSession } from 'next-auth/react';
import _ from "lodash"
import { Avatar } from '@mui/material';
import Image from 'next/image';
import useSWR from "swr";
import { getProfileDetails,getPostsOfProfile } from '../../globalSetups/api';
import Head from "next/head"

const Tabulate = ({user}) => {

  const postInsights=useRef([['Your Posts','Views','LikedBy','DislikedBy']])
  const {data:session,status}=useSession()
  const {data:profile,error}=useSWR("GetBasicDetail",()=>getProfileDetails({email:user && user.email}))
  const {data:posts,error:postsError}=useSWR("GetPostsOfAuthenticatedPerson",()=>getPostsOfProfile({createdBy:user.id}))

  if(error)
     return <h1>error</h1>
  if(!profile || !posts){
    return <p>Loading</p>
  }

  postInsights.current=_.concat(postInsights.current,posts.data.map((item,key)=>{return [key+1,item.view,item.likedBy.length,item.dislikedBy.length]}))


  // const data=postInsights;
  const options = {
    chart: {
      title: "Your Posts Insights",
      subtitle: "day wise"
    },
  };

  return (
  <div className='grid' style={{height:"calc(100vh - 2rem)",gridTemplateRows:"auto 1fr auto"}}>
  <Head>
    <title>Tabulate - Ikshvaku</title>
  </Head>

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
      data={postInsights.current}
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

