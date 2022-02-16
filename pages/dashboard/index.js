
import React,{useState,useRef,useLayoutEffect, useEffect} from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import galStyles from "../../styles/Gallery.module.css"
import { getProfileDetails,getPostsOfProfile,updateProfileImage } from '../../globalSetups/api';
import { getSession,useSession } from 'next-auth/react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { IconButton,Avatar } from '@mui/material';
import Image from 'next/image';
import _ from "lodash"
import useSWR, { mutate } from 'swr';
import Loader from "../../components/global/DashboardLoader"
import AddPost from "../../components/utils/dialogs/addPost"
import { defaultOptions } from '../../globalSetups/availableArrays';
import DeveloperOptions from "../../components/utils/dialogs/developerOptions"
import DashboardPost from "../../components/utils/dashboardPost"
import {motion, AnimatePresence} from "framer-motion"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChangeProfileDialog from '../../components/utils/dialogs/changeProfile';
import Head from "next/head"
import dateFormat from 'dateformat';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { yMove } from '../../globalSetups/framer';
import EditIcon from '@mui/icons-material/Edit';
import millify from "millify";
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';


const Dashboard = ({user}) => {

  const [selected,setSelected]=useState(-1)
  const [objectFit,setObjectFit]=useState(true)
  const ref=useRef(null)
  const {data:profile}=useSWR("GetBasicDetail",()=>getProfileDetails({email:user && user.email}))
  const {data:posts,error}=useSWR("GetPostsOfAuthenticatedPerson",()=>getPostsOfProfile({createdBy:user.id}))
  
  if(error){
      return <h1>some error </h1>
    }
  if(!posts || !profile){
      return (
        <Loader/>
        )
    }

    window.onclick = function(event) {
        if (event.target == ref.current) {
            setSelected(-1)
        }
      }

  return <>
      <Head>
          <title>
              Dashboard
          </title>
      </Head>
      <div className={`${styles.profileContainer}`}>
         <div className='mb-4'
         >
            <div className="relative"
            >
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
              <EditIcon className="absolute text-white bottom-2 right-2 z-20"/>
            </div>
            <div 
             className='p-4 grid justify-between  w-full'
             >
             <div className="flex items-center relative -top-2/4"
             >
                <div 
                 className="border-8 border-white bg-white rounded-full"
                 style={{height:"166px",width:"166px"}}
                >
                    {
                    (profile.image===profile.availableImages.length-1)
                    ?
                    <ChangeProfileDialog 
                       profileId={profile._id}
                    />
                    :
                    <motion.div
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                    >
                        <Image
                            className="rounded-full "
                            layout='fixed'
                            height={150}
                            width={150}
                            objectFit='cover'
                            src={profile.availableImages[profile.image]}
                            alt="Your Cover Image"
                        />
                    </motion.div>
                    }
                </div>
                <div 
                    className='mt-4 relative top-1/4 -translate-y-1/4 flex items-center'
                >
                    <div className="flex flex-col mr-4 ">
                        <IconButton
                            disabled={profile.image===profile.availableImages.length-1?true:false}
                            onClick={()=>{
                                mutate('GetBasicDetail',{...profile,image:profile.image+1},false);
                                updateProfileImage({id:profile._id,step:1});
                            }}
                        >
                            <ArrowDropUpIcon/>
                        </IconButton>
                        <IconButton
                            disabled={profile.image===0 ?true:false}
                            onClick={()=>{
                                mutate('GetBasicDetail',{...profile,image:profile.image-1},false);
                                updateProfileImage({id:profile._id,step:-1});
                            }}
                        >
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </div>
                    <div>
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
         </div>
         <div className={`${styles.dashboardBody}`}>
            
            <div>
                <p className='text-xl mb-4'>Your Creations</p>
                <div className={`grid grid-cols-3 gap-8 px-4`}>
                    { 
                        posts.data && posts.data.map((item,key)=>{
                            return(
                                <motion.div 
                                    key={key}
                                    onClick={()=>setSelected(key)}
                                    layoutId={"dashboardPosts"+key}
                                    className="cursor-pointer"
                                >
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
                    avatar={profile.availableImages[profile.image]}/>
           </div>
         </div>
      </div>

     <AnimatePresence>
        {
            selected>=0 &&
            <motion.div 
                ref={ref}
                layoutId={"dashboardPosts"+selected} 
                style={{backdropFilter:"blur(5px)",zIndex:"20",position:"fixed",background:"transparent",height:"100vh",width:"100vw",display:"Grid",placeItems:"Center",top:"0%",left:"0%"}}
               >
               <div
                className="grid grid-cols-2 bg-white rounded"  
                style={{width:"80vw",height:"calc(100vh - 10rem)",background:"white",zIndex:"20",boxShadow:"1px 1px 20px #000"}}>
                   <div className={`rounded ${galStyles.specContainer}`}
                   >
                   {
                        ["jpeg","jpg","png","tiff"].includes(posts.data[selected].imageList[0].substring(posts.data[selected].imageList[0].lastIndexOf(".") + 1))
                        ?
                        <div 
                            className={`${galStyles.specImgContainer}`}
                        >
                        <Image
                            className={galStyles.customimg}
                            layout="fill"
                            height={1}
                            width={1}
                            src={posts.data[selected].imageList[0]}
                            alt="Image"
                            objectPosition="center"
                            objectFit={objectFit?"cover":"contain"}
                        />
                        </div>
                        :
                        <video 
                            className='object-center'
                            style={{height:"calc(100vh - 10rem)",width:"100%",outline:"none",objectFit:objectFit?"cover":"contain",objectPosition:"center !important"}}
                            controls
                            loop
                            src={posts.data[selected].imageList[0]}
                        >
                        </video>
                    }

                    </div> 
                    <div className={`${galStyles.specText}`}
                        style={{height:"calc(100vh -10rem)"}}
                    >
                        <div className="flex p-2 border-b-2">
                            <div className='pl-2 flex items-center'>
                                <Avatar
                                    src={profile.availableImages[profile.image]}
                                    alt="Image posted by"
                                    sx={{width:50,height:50}}
                                />
                                <p className="ml-4">{profile.name}</p>
                                {profile.isVerified && <IconButton><VerifiedIcon className="text-xl" style={{color:"#0080ff"}}/></IconButton>} 
                            </div>
                        </div>
                        <motion.div 
                          initial="initial"
                          animate="final"
                          exit="initial"
                          transition={{delay:0.5,duration:0.5}}
                          variants={yMove}
                          className="flex justify-between flex-col grow" style={{overflow:"auto"}}>
                            <div className="p-4 ">
                                <p className="text-xs mb-4">{dateFormat(posts.data[selected].createdAt,"fullDate")}</p>
                                <p>{posts.data[selected].about}</p>
                            </div>
                        </motion.div>
                        <div className="border-t-2 p-2 flex justify-between">
                        <div className="flex items-center">
                                <IconButton
                                >
                                    <FavoriteIcon style={{color:"#f59e0b"}}/>
                                </IconButton>
                                <p className="pl-2">1</p>
                                <IconButton className="pl-2">
                                    <FilterTiltShiftIcon/>
                                </IconButton>
                                <p className='pl-2'>{millify(posts.data[selected].view)}</p>
                            </div>
                            <div className='flex'>
                                <IconButton
                                    onClick={()=>setObjectFit(!objectFit)}
                                >
                                    <DashboardOutlinedIcon/>
                                </IconButton>

                                <IconButton onClick={()=>setSelected(-1)}>
                                   <CloseIcon/>
                                </IconButton>
                            </div>
                        </div>
                   </div>
               </div>
            </motion.div>
        }
     </AnimatePresence>

  </>;
};

Dashboard.Layout = DashboardLayout

export default Dashboard;

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
    console.log(session)

    return {
        props:{
            user:session.user
        }
    }
 }
 