import React,{useState,useRef,useLayoutEffect, useEffect} from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import { getProfileDetails,getPostsOfProfile } from '../../globalSetups/api';
import { getSession,useSession } from 'next-auth/react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import _ from "lodash"
import useSWR from 'swr';
import Loader from "../../components/global/DashboardLoader"
import AddPost from "../../components/utils/dialogs/addPost"
import { defaultOptions } from '../../globalSetups/availableArrays';
import DeveloperOptions from "../../components/utils/dialogs/developerOptions"
import DashboardPost from "../../components/utils/dashboardPost"
import {motion, AnimatePresence} from "framer-motion"

export async function  getServerSideProps(context){

   const session = await getSession(context)
   if(_.isNull(session)){
        return {
            redirect:{
                destination:`${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard`,
                permanent:false
            }
        }
   }
   return {
       props:{
           profile: (await getProfileDetails({email:session.user.email})).data,
       }
   }
}


const Dashboard = ({profile}) => {

  const [selected,setSelected]=useState(null)
  const {data:posts,error}=useSWR("GetPostsOfAuthenticatedPerson",()=>getPostsOfProfile({createdBy:profile._id}))
  if(error){
      return <h1>some error</h1>
  }
  if(!posts){
      return (
        <Loader/>
      )
  }
  return <>
      <div className={`${styles.profileContainer}`}>
         <div className='mb-4'>
            <div
             className={`relative h-40 rounded-2xl w-full overflow-hidden`}
             style={{height:'10rem'}}
            >
                <Image
                   layout='fill'
                   objectFit='cover'
                   src={profile.coverImage}
                   alt="Your Cover Image"
                />
            </div>
            <div 
             className='p-4 grid justify-between  w-full'
            >
             <div className="flex items-center relative -top-2/4"
             >
                <div 
                 className="border-8 border-white rounded-full"
                >
                    <Image
                        className="rounded-full "
                        layout='fixed'
                        height={150}
                        width={150}
                        objectFit='cover'
                        src={profile.image}
                        alt="Your Cover Image"
                    />
                </div>
                <div 
                    className='mx-4 my-8 relative top-1/4 -translate-y-1/4'
                >
                    <div className='flex items-center'>
                        <p className="text-3xl">{profile.name}</p>
                        {profile.isVerified && <IconButton className="ml-2"><VerifiedIcon style={{color:"#0080ff"}}/></IconButton>} 
                        {profile.isDeveloper && <DeveloperOptions className="ml-2"/>}
                    </div>
                    <p className='text-sm mt-1'>{profile.about}  </p>
                </div> 
              </div>
            </div>
         </div>
         <div className={`${styles.dashboardBody}`}>
            
            <div>
                <p className='text-xl mb-4'>Your Creations</p>
                <div className={`grid grid-cols-3 gap-8 px-4`}>
                    { 
                        posts.data && posts.data.map((item,key)=>{
                            return(
                                <motion.div 
                                    onClick={()=>setSelected(key)}
                                    layoutId={"dashboardPosts"+key}
                                    key={key}>
                                    <DashboardPost item={item}/>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
           <div className="m-2">
               <AddPost 
                    name={profile.name} 
                    avatar={profile.image}/>
           </div>
         </div>
      </div>

     <AnimatePresence>
        {
            selected &&
            <motion.div 
                layoutId={"dashboardPosts"+selected} 
                style={{zIndex:"20",position:"fixed",background:"transparent",height:"100vh",width:"100vw",display:"Grid",placeItems:"Center",top:"0%",left:"0%"}}
               >
               <div  style={{width:"80vw",height:"80vh",background:"red",zIndex:"20"}}>
                   <button onClick={()=>setSelected(null)}>back</button>
               </div>
            </motion.div>
        }
     </AnimatePresence>

  </>;
};

Dashboard.Layout = DashboardLayout

export default Dashboard;
