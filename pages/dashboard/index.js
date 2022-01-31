import React,{useState,useRef,useLayoutEffect, useEffect} from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import { getProfileDetails } from '../../globalSetups/api';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import _ from "lodash"
import TextEditor from "../../components/utils/TextEditor"
import AddPost from "../../components/utils/dialogs/addPost"

export async function  getServerSideProps(context){

   const session = await getSession(context)
   if(_.isNull(session)){
        return {
            redirect:{
                destination:"http://localhost:3000/auth/signin?callbackUrl=http://localhost:3000/dashboard",
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
                    <p className="text-3xl">{profile.name}</p>
                    <p className='text-sm mt-1'>{profile.about}  </p>
                </div> 
              </div>
            </div>
         </div>
         <div className={`${styles.dashboardBody}`}>
            
            <div>
                aman
            </div>
           <div className="m-2">
               <AddPost 
                    name={profile.name} 
                    avatar={profile.image}/>
           </div>
         </div>
      </div>
  </>;
};

Dashboard.Layout = DashboardLayout

export default Dashboard;
