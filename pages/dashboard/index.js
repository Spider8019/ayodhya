import React,{useState,useRef,useLayoutEffect} from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import { getProfileDetails } from '../../globalSetups/api';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import _ from "lodash"

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
           profile: session ? (await getProfileDetails({email:session.user.email})).data : "adfa "
       }
   }
}


const Dashboard = ({profile}) => {

  const reference1=useRef(null)
  const [topPos,setTopPos]=useState(0)

  useLayoutEffect(() => {

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  
  }, [])

  const onScroll = () => {
    if(!reference1.current) return
    setTopPos(window.scrollY)
  }



  return <div>
      <div className={`${styles.profileContainer}`}>
         <div className="">
            <div
             className={`relative h-40 rounded-2xl w-full overflow-hidden`}
             style={{height:`calc(10rem - ${topPos}px`}}
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
                    ref={reference1}
                >
                    <p className="text-3xl">{profile.name}</p>
                    <p className='text-sm mt-1'>{profile.about}  </p>
                </div> 
             </div>
         </div>
         </div>

      </div>
  </div>;
};

Dashboard.Layout = DashboardLayout

export default Dashboard;
