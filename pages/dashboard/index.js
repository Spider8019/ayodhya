
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
import ChangeProfileDetails from "../../components/utils/dialogs/editDetail"
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
import millify from "millify";
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import { notifyerror, notifysuccess, notifywarn } from '../../components/snackbar';
import { deleteObject,uploadObject } from '../../globalSetups/aws/s3';
import { nanoid } from 'nanoid';
import { editProfileCoverImage } from '../../globalSetups/api';
import {isMobile} from "react-device-detect"

const Dashboard = ({user,msg}) => {


  const [selected,setSelected]=useState(-1)
  const [objectFit,setObjectFit]=useState(true)
  const [coverImage,setCoverImage]=useState(null)
  const [fileCoverImage,setFileCoverPreview]=useState("")
  const [coverProcessing,setCoverProcessing]=useState(false)
  const ref=useRef(null)
  const {data:profile}=useSWR("GetBasicDetail",()=>getProfileDetails({email:user && user.email}))
  const {data:posts,error}=useSWR("GetPostsOfAuthenticatedPerson",()=>getPostsOfProfile({createdBy:user.id}))

  useEffect(()=>{
        if(msg==="0"){
            notifywarn("You are not a developer")
        }
    },[])

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

  const handleFile=(e)=>{
    setFileCoverPreview(URL.createObjectURL(e.target.files[0]))
    setCoverImage(e.target.files[0])
  }

  const handleUploadCover = async()=>{
    setCoverProcessing(true)
    await deleteObject({url:profile.coverImage},async(dltErr,dltData)=>{
        if(_.isNull(dltErr)){
            await uploadObject({file:coverImage,filename:"spider8019"+nanoid(10)+"."+coverImage.name.substring(coverImage.name.lastIndexOf(".") + 1)},async(err,data)=>{
                if(_.isNull(err)){
                    const payload={
                      coverImage:data.Location,
                      email:profile.email
                    }
                    const response=await editProfileCoverImage(payload)
                    if(response.status===200){
                        setCoverImage(null);
                        setFileCoverPreview(null) 
                        setCoverProcessing(false)
                        notifysuccess("Your cover image has been successfully updated.")          
                        mutate("GetBasicDetail",{...profile,coverImage:data.Location},false)
                    }
                    else{
                      notifyerror(err)
                      setCoverProcessing(true)
                    }
                  }
              })
        }
        else{
            notifyerror(errDlt)
            setCoverProcessing(true)
        }
    })
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
                className={`relative h-60 sm:h-40 rounded w-full overflow-hidden`}
               >
                <Image
                   layout='fill'
                   objectFit='cover'
                   src={fileCoverImage?fileCoverImage:profile.coverImage}
                   alt="Your Cover Image"
                   priority
                />
              </div>
              <div 
                style={{pointerEvents:coverProcessing?"none":"auto",cursor:coverProcessing?"no-drop":"pointer",background:"rgba(0,0,0,0.64)"}}
                className='flex text-sm rounded absolute top-2 right-2 z-20 text-white'>
                {fileCoverImage && <p 
                    className='cursor-pointer border-r p-2 border-amber-500'
                    onClick={()=>{setCoverImage(null);setFileCoverPreview("")}}
                >Cancel</p>}
                {fileCoverImage && <motion.p 
                    className='cursor-pointer border-r p-2 border-amber-500'
                    onClick={handleUploadCover}
                >{coverProcessing?"Uploading...":"Upload"}</motion.p>}
                <label className="cursor-pointer p-2 ">
                    <input
                        onChange={handleFile}
                        accept={"image/*"}
                        type="file"/>
                        Change
                </label>
              </div>
            </div>
            <div 
             className='p-4 grid justify-between  w-full'
             >
             <div className="flex flex-wrap items-center relative -top-1/3 sm:-top-2/4"
             >
                <div 
                 className="mx-auto border-8 border-white bg-white rounded-full"
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
                    className='mx-auto sm:mt-4 relative sm:top-1/4 sm:-translate-y-1/4 sm:flex items-center justify-center'
                >
                    <div className="flex justify-center sm:flex-col sm:mr-4 ">
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
                        <div className='flex flex-col sm:flex-row items-center'>
                            <p className="text-3xl">{profile.name}</p>
                            <div className="flex">
                                {profile.isVerified && <IconButton className="ml-2"><VerifiedIcon style={{color:"#0080ff"}}/></IconButton>} 
                                {profile.isDeveloper && <DeveloperOptions className="ml-2"/>}
                            </div>
                        </div>
                        <p className='text-sm mt-1'>{profile.about}  </p>
                    </div>
                </div> 
              </div>
            </div>
         </div>
         <div className={`${styles.dashboardBody}`}>
            
            <div className="order-6 sm:order-2 mx-4" >
                <p className='text-xl mb-4'>Your Creations</p>
                <div className={`h-full grid grid-cols-2 sm:grid-cols-3 gap-x-4 `}>
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
           <div className="mx-4 sm:mx-0 order-5">
               <AddPost 
                    name={profile.name} 
                    avatar={profile.availableImages[profile.image]}/>
               <div className='my-2'></div>
               <ChangeProfileDetails
                    name={profile.name}
                    about={profile.about}
                    email={profile.email}
               />
           </div>
         </div>
      </div>

     <AnimatePresence>
        {
            selected>=0 &&
            <motion.div 
                ref={ref}
                layoutId={"dashboardPosts"+selected} 
                style={{backdropFilter:"blur(5px)",zIndex:"20",position:"fixed",background:"transparent",height:"100vh",width:"100vw",display:"Grid",placeItems:isMobile?"end":"center",bottom:"0%",left:"0%"}}
               >
               <div
                className=" grid grid-cols-1 sm:grid-cols-2  grid-rows-2 sm:grid-rows-1 bg-white rounded"  
                style={{width:isMobile?"100vw":"80vw",height:isMobile?"calc(100vh - 60px)":"calc(100vh - 10rem)",zIndex:"20",boxShadow:"1px 1px 20px #000"}}>

                   {
                        ["jpeg","jpg","png","tiff"].includes(posts.data[selected].imageList[0].substring(posts.data[selected].imageList[0].lastIndexOf(".") + 1))
                        ?
                        <div 
                            className={`${galStyles.specImgContainer}`}
                            style={{width:"100%",height:"100%"}}
                        >
                        <Image
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
                            style={{height:"100%",width:"100%",outline:"none",objectFit:objectFit?"cover":"contain",objectPosition:"center !important"}}
                            controls
                            loop
                            src={posts.data[selected].imageList[0]}
                        >
                        </video>
                    }

                    <div className={`${galStyles.specText}`}
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

    const {query}=context;
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
            user:session.user,
            msg:query.msg?query.msg:null
        }
    }
 }
 