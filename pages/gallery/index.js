import React, { useState } from 'react';
import styles from '../../styles/Gallery.module.css'
import { useSession } from 'next-auth/react';
import useSWR,{mutate} from 'swr';
import { IconButton,Pagination,Stack } from '@mui/material';
import {galleryPosts,markLikeAndDislike,getGigsCount} from "../../globalSetups/api"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InterestsIcon from '@mui/icons-material/Interests';
import _ from "lodash"
import { useRouter } from 'next/router';
import DashboardPost from "../../components/utils/galleryFrame"
import Head from "next/head"
import GalleryLoader from "../../components/global/GalleryLoader"
import {isMobile,MobileView} from "react-device-detect"
import { motion, useViewportScroll, useTransform } from "framer-motion"


const Gallery = ({count}) => {
    
    const { scrollYProgress,scrollY } = useViewportScroll()
    const top = useTransform(scrollYProgress, [0, 1], ["0", "-25%"]);

    const bg = useTransform(scrollYProgress, [0, 1], ["linear-gradient(#fff,#fff)","linear-gradient(#fff,#f59e0b)"]);

    const {data:session,status}=useSession()
    const router=useRouter()
    const [cnt, setCnt] = useState(1)
    const [filterShow,setFilterShow]=useState(false)

    const {data,error}=useSWR('FetchingDataForPage',()=>galleryPosts({page:cnt-1}))

    if(error){
        return(
         <h1>Something went wrong</h1>
        )
    }

    if(!data){
        return(
         <GalleryLoader/>
        )
    }

    return(
        <div className="grid place-items-center"
        >
        <Head>
            <title>
                Gallery - Ikshvaku
            </title>
        </Head>
        {
            filterShow
            &&
                <motion.div className='grid grid-cols-8 m-20 mb-0 items-start bg-amber-200'
                    style={{width:"calc(100% - 10rem)"}}
                >
                    <div className='grid grid-cols-1 '>
                        <button className='text-slate-500 text-left p-1'>Video</button>
                        <button className='text-slate-500 text-left p-1'>Photos</button>
                    </div>
                    <div className='grid grid-cols-1'>
                        <button className='text-slate-500 text-left p-1'>Artworks</button>
                    </div>

                </motion.div>
        }

        <MobileView>
            <p  style={{width:"95vw"}}
                className="text-left w-full text-2xl font-bold mt-8">S<span className="text-amber-500">KILLS</span></p>
                <span className="font-normal text-xs">Lets find talents</span>
        </MobileView>


        <motion.div 
            className="pb-12 grid place-items-center"
            style={{background:isMobile?"white":bg}}
        >
            <motion.div  className={`${styles.galleryRow}`}
            >
                {
                    new Array(isMobile?1:5).fill("").map((arr,key)=>{
                        return(
                            <motion.div key={key} className={`${styles.galleryColumn} relative`}
                                style={{top:key%2===1?top:0}}
                            >
                                {
                                    data && data.slice((data.length/(isMobile?1:5))*key,(data.length/(isMobile?1:5))*(key+1)).map((ind,index)=>{
                                        return(
                                            <div key={index} className={`${styles.galleryImage} relative`}
                                            >
                                                <div className={styles.galleryImg}>
                                                    <DashboardPost fileUrl={ind.imageList[0]}/>
                                                </div>       
                                                <div className={styles.galleryImgControls}>
                                                    <div className="p-2">
                                                        <p>{ind.about.slice(0,25)+(ind.about.length>=25?"...":"")}</p>
                                                        <p className='text-xs'>{ind.createdBy.name}</p>
                                                    </div>
                                                    <div className={styles.galleryImgButtons}>
                                                    {session &&
                                                            <IconButton 
                                                                onClick={()=>{
                                                                    mutate("FetchingDataForPage",[...data])
                                                                    markLikeAndDislike({likedBy:session.user.id,gigId:ind._id})
                                                                    mutate("FetchingDataForPage")
                                                                }}
                                                            >
                                                                {ind.likedBy.includes(session.user.id) ? <FavoriteIcon style={{color:"#f59e0b"}}/> :<FavoriteBorderIcon style={{color:"white"}}/>}
                                                            </IconButton>
                                                    }
                                                            <IconButton 
                                                                onClick={()=>{router.push(`/gallery/${ind._id}`)
                                                            }}
                                                            >
                                                                <ZoomOutMapIcon className={"text-white"}/>
                                                            </IconButton>
                                                            <IconButton 
                                                                onClick={()=>window.open(ind.imageList[0])}
                                                            >
                                                                <InterestsIcon  className={"text-white"}/>
                                                            </IconButton>
                                                        </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </motion.div>
                        )
                    })
                }
            </motion.div>
            <Stack spacing={2}
            >
                <Pagination 
                    count={Math.ceil(count/50)} 
                    variant="outlined" 
                    page={cnt}
                    onChange={(event,value)=>{setCnt(value)}}
                />
            </Stack>    
        </motion.div>

        </div>
    )
    
};

export default Gallery;

export async function getServerSideProps(){
    const count=(await getGigsCount()).data
    return{
        props:{
            count
        }
    }
}

