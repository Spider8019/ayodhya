import React, { useEffect, useState } from 'react';
import styles from '../../styles/Gallery.module.css'
import { useSession } from 'next-auth/react';
import useSWR,{mutate} from 'swr';
import { IconButton,Pagination,Stack,Button } from '@mui/material';
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
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
import { motion, useViewportScroll, useTransform, useMotionValue, useVelocity, AnimatePresence } from "framer-motion"
import { zeroHeightAndWidth,xMove } from '../../globalSetups/framer';

const Gallery = ({count}) => {
    
    const { scrollYProgress,scrollY } = useViewportScroll()

    const top = useTransform(scrollYProgress, [0, 1], ["0", "-25%"]);
    const rel= useTransform(scrollYProgress, [0, 1], [0, 10]);
    const bg = useTransform(scrollYProgress, [0, 1], ["linear-gradient(#fff,#fff)","linear-gradient(#fff,#f59e0b)"]);
    const [velocity,setVelocity]=useState(0)
    
    const {data:session,status}=useSession()
    const router=useRouter()
    const [query,setQuery]=useState(router.query.query)
    const [cnt, setCnt] = useState(1)
    const [filterShow,setFilterShow]=useState(false)

    useEffect(()=>{
        scrollYProgress.onChange(()=>{
            console.log(scrollYProgress.getVelocity())
            setVelocity(scrollYProgress.getVelocity())
        })
    },[scrollYProgress])

    const {data,error}=useSWR('/FetchingDataForPage?query='+router.query.query,()=>galleryPosts({page:cnt-1,query:router.query.query}),{revalidateOnFocus:false})

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

    const handleQuery=(q)=>{
        setQuery(q)
        setFilterShow(false)
        router.push(`/gallery/?query=${q}`)
    }

    return(
        <div className="grid relative"
        >
        <Head>
            <title>
                Gallery - Ikshvaku
            </title>
        </Head>
        {
            !filterShow
            &&
            <motion.div 
                initial="initial"
                animate="final"
                final="initial"
                variants={xMove}
                className="flex justify-end absolute top-4 right-4">
                <IconButton 
                    onClick={()=>setFilterShow(!filterShow)}>
                        <FilterBAndWIcon />
                </IconButton>
            </motion.div>
        }
        <AnimatePresence exitBeforeEnter>
        {
            filterShow
            &&
                <motion.div 
                    className='dark:bg-black dark:text-white bg-amber-50 p-4 mx-0 mb-0 '
                    initial="initial"
                    animate="final"
                    exit="initial"
                    variants={zeroHeightAndWidth}
                >
                    <div className='p-2  grid grid-cols-8 gap-4 items-start'>

                        <motion.div 
                            variants={xMove}
                            className='grid grid-cols-1 '>
                            <p 
                                className="text-center uppercase my-2 font-semibold text-sm "
                            >
                                Type
                            </p>
                            <Button 
                                onClick={()=>handleQuery("video")}
                                className={`text-left text-xs ${query==='video'?'bg-amber-100 mt-2':'bg-transparent mt-2 '}`}>Video</Button>
                            <Button
                                onClick={()=>handleQuery("photos")}
                                className={`text-xs ${query==='photos'?'bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Photos</Button>
                        </motion.div>
                        <motion.div 
                            variants={xMove}
                            className='grid grid-cols-1'>
                            <p 
                                className="text-center uppercase my-2 font-semibold text-sm "
                            >
                                Category
                            </p>
                            <Button 
                                onClick={()=>handleQuery("dance")}
                                className={` text-xs ${query==='dance'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Dance</Button>
                            <Button 
                                onClick={()=>handleQuery("crafts")}
                                className={` text-xs ${query==='crafts'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Crafts</Button>
                            <Button 
                                onClick={()=>handleQuery("photography")}
                                className={` text-xs ${query==='photography'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Photography</Button>
                            <Button 
                                onClick={()=>handleQuery("artworks")}
                                className={` text-xs ${query==='artworks'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Artworks</Button>
                            <Button 
                                onClick={()=>handleQuery("others")}
                                className={` text-xs ${query==='others'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Others</Button>
                        </motion.div>
                        <motion.div 
                            variants={xMove}                        
                            className='grid grid-cols-1'>
                            <p 
                                className="text-center uppercase my-2 font-semibold text-sm "
                            >
                                Category
                            </p>
                            <Button 
                                onClick={()=>handleQuery("makeup")}
                                className={` text-xs ${query==='makeup'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Mehndi</Button>
                            <Button
                                onClick={()=>handleQuery("mehndi")}
                                className={` text-xs ${query==='mehndi'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Makeup</Button>
                        </motion.div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <motion.div
                            className='grid grid-cols-1'
                            variants={xMove}
                        >
                            <Button
                                onClick={()=>{setFilterShow(false);}}
                                className={`font-semibold  text-xs ${query==='photos'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Close
                            </Button>
                             <Button
                                onClick={()=>{setQuery(null); setFilterShow(false); router.push("/gallery")}}
                                className={` text-xs ${query==='photos'?' bg-amber-100 mt-2':'bg-transparent mt-2'}`}>Remove Filter
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
        }   
        </AnimatePresence>

        <MobileView>
            <p  style={{width:"95vw"}}
                className="text-left w-full text-2xl font-bold mt-8">S<span className="text-amber-500">KILLS</span></p>
                <span className="font-normal text-xs">Lets find talents</span>
        </MobileView>


        <motion.div 
            className="pb-12 grid place-items-center"
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

