import React,{useState,useEffect} from 'react';
import {getSpecificGalleryPost} from "../../globalSetups/api"
import styles from "../../styles/Gallery.module.css"
import Image from 'next/image';
import {Avatar,IconButton} from "@mui/material"
import dateFormat from "dateformat"
import { yMove } from '../../globalSetups/framer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { getSession,useSession } from 'next-auth/react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShareDialog from "../../components/utils/dialogs/sharePage"
import { markLikeAndDislike,getPostsOfProfile,incrementView } from '../../globalSetups/api';
import parse from 'html-react-parser';
import Link from "next/link"
import Head from "next/head"
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import millify from "millify";
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import { useRouter } from 'next/router';


const Gallery = ({detail}) => {

  const [posts,setPosts]=useState([])
  const [objectFit,setObjectFit]=useState(false)
  const router=useRouter()

  const {data:session,status}=useSession()
  const [like,setLike]=useState(session && detail.likedBy.includes(session.user.id) )
  const [likedBy,setLikedBy]=useState(session && detail.likedBy.length)

  const onLikeShowMore=async()=>{
    if(!posts){
        const data = await getPostsOfProfile({createdBy:detail.createdBy._id})
        if(data.status===200)
          setPosts(data.data)
    }
  }

  useEffect(()=>{
    const abortCont=new AbortController();
    (async()=>{
        await incrementView({gigId:detail._id})
    })();

    return ()=>abortCont.abort()
  },[])

  return <div className={`${styles.specContainerParent}`}>
      <Head>
          <title>
                {"@"+detail.createdBy.name}
          </title>
      </Head>
      <div className={`rounded overflow-hidden ${styles.specContainer}`}>

                    {
                        ["jpeg","jpg","png","tiff"].includes(detail.imageList[0].substring(detail.imageList[0].lastIndexOf(".") + 1))
                        ?
                        <div 
                            className={`${styles.specImgContainer}`}
                        >
                        <Image
                            className={styles.customimg}
                            layout="fill"
                            height={1}
                            width={1}
                            src={detail.imageList[0]}
                            alt="Image"
                        />
                        </div>
                        :
                        <video 
                            className='object-center'
                            style={{height:"80vh",width:"100%",outline:"none",objectFit:objectFit?"cover":"contain",objectPosition:"center !important"}}
                            controls
                            loop
                            autoPlay
                            muted
                            src={detail.imageList[0]}
                        >
                        </video>
                    }

            <div className={`${styles.specText}`}>
                <div className="flex p-2 border-b-2">
                   <div className='pl-2 flex items-center'>
                    <Avatar
                        src={detail.createdBy.availableImages[detail.createdBy.image]}
                        alt="Image posted by"
                        sx={{width:50,height:50}}
                    />
                    <p className="ml-4">{detail.createdBy.name}</p>
                    {detail.createdBy.isVerified && <VerifiedIcon style={{color:"#0080ff",marginLeft:"0.25rem",fontSize:"1.25rem"}}/>} 
                   </div>
                </div>
                <div className="flex justify-between flex-col grow" style={{overflow:"auto"}}>
                    <motion.div 
                        initial="initial"
                        exit="final"
                        animate="final"
                        variants={yMove}
                        transition={{delay:0.5,duration:0.5}}
                        className="p-4 ">
                        <p className="text-xs mb-4">{dateFormat(detail.createdAt,"fullDate")}</p>
                        <p>{parse(detail.about)}</p>
                    </motion.div>
                    {
                        posts.length>1 && session
                        &&
                        <div className={styles.morePostsSpec}>
                        {
                         posts && posts.map(item=>{
                                return(
                                    item._id!==detail._id
                                    &&
                                    <Link
                                        href={"/gallery/"+item._id}
                                        key={item._id}
                                        scroll={false}
                                    >
                                        <a>
                                       { ["jpeg","jpg","png","tiff"].includes(item.imageList[0].substring(item.imageList[0].lastIndexOf(".") + 1))
                                         ?
                                         <div style={{width:"100%",height:"100%"}}>
                                             <Image 
                                                 src={item.imageList[0]}
                                                 alt={item.about}
                                                 layout="fixed"
                                                 height={150}
                                                 width={150}
                                                 objectFit='cover'
                                             />
                                         </div>
                                          :
                                            <video 
                                              style={{width:"100%",height:"150px",objectFit:"COVER"}}
                                            >
                                                <source src={item.imageList[0]}/>
                                            </video>
                                        }
                                        </a>
                                    </Link>    
                                    )
                                })
                            }
                        </div>
                    }
                    
                </div>
                <div className="border-t-2 p-2 flex justify-between">
                    {
                        session 
                        ?
                        <div className="flex items-center">
                            <IconButton
                            onClick={()=>{
                                onLikeShowMore();
                                !posts && markLikeAndDislike({likedBy:detail.createdBy._id,gigId:detail._id});
                                setLike(!like)
                                like ? setLikedBy(likedBy-1) : setLikedBy(likedBy+1)
                            }}
                            >
                                {session && like? <FavoriteIcon style={{color:"#f59e0b"}}/> : <FavoriteBorderIcon/>}
                            </IconButton>
                            <p className="px-2">{likedBy}</p>
                            <IconButton className="pl-2">
                                    <FilterTiltShiftIcon/>
                            </IconButton>
                            <p className='pl-2'>{millify(detail.view)}</p>
                        </div>
                        :
                        <span></span>
                    }
                    <div className='flex'>
                        <IconButton
                            onClick={()=>setObjectFit(!objectFit)}
                        >
                            <DashboardOutlinedIcon/>
                        </IconButton>

                        <ShareDialog url={router.asPath} title={detail.about}/>
                    </div>
                </div>
            </div>
      </div>
  </div>;
};

export async function getServerSideProps(context){

    const {params}=context
    const data=(await getSpecificGalleryPost({gigId:params.gallery})).data
    const session=await getSession(context)
    return {
        props:{
            session,
            detail:data
        }
    }
}

export default Gallery;
