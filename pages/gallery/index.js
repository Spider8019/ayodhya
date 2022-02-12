import React, { useState } from 'react';
import styles from '../../styles/Gallery.module.css'
import { useSession } from 'next-auth/react';
import useSWR,{ useSWRConfig } from 'swr';
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



const Gallery = ({count}) => {
    
    const {data:session,status}=useSession()
    const router=useRouter()
    const [cnt, setCnt] = useState(1)

    const {data,error}=useSWR('FetchingDataForPage',()=>galleryPosts({page:cnt-1}))
    
    if(error){
    return(
        <h1>Something went wrong</h1>
        )
    }

    if(!data){
    return(
        <h1>Loading</h1>
        )
    }
    
        
    return(
        <div className="grid place-items-center mb-12">
        <Head>
            <title>
                Gallery - Ikshvaku
            </title>
        </Head>
        <div  className={styles.galleryRow}>
            {
                new Array(5).fill("").map((arr,key)=>{
                    return(
                        <div key={key} className={styles.galleryColumn}>
                            {
                                data.data && data.data.slice((data.data.length/5)*key,(data.data.length/5)*(key+1)).map((ind,index)=>{
                                    return(
                                        <div key={index} className={styles.galleryImage}>
                                            <div className={styles.galleryImg}>
                                                <DashboardPost fileUrl={ind.imageList[0]}/>
                                            </div>       
                                            <div className={styles.galleryImgControls}>
                                                <div className="p-2">
                                                    <p>{ind.about.slice(0,25)+(ind.about.length>=25?"...":"")}</p>
                                                    <p className='text-xs'>{ind.createdBy.name}</p>
                                                </div>
                                                {session &&
                                                    <div className={styles.galleryImgButtons}>
                                                        <IconButton 
                                                            onClick={()=>{
                                                                markLikeAndDislike({likedBy:session.user.id,gigId:ind._id})
                                                            }}
                                                        >
                                                            {ind.likedBy.includes(session.user.id) ? <FavoriteIcon style={{color:"#f59e0b"}}/> :<FavoriteBorderIcon style={{color:"white"}}/>}
                                                        </IconButton>
                                                        <IconButton 
                                                            onClick={()=>router.push(`/gallery/${ind._id}`)}
                                                            className={"text-white"}>
                                                            <ZoomOutMapIcon/>
                                                        </IconButton>
                                                        <IconButton 
                                                            onClick={()=>window.open(ind.imageList[0])}
                                                            className={"text-white"}>
                                                            <InterestsIcon/>
                                                        </IconButton>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
 
         <Stack spacing={2}
         >
            <Pagination 
                count={Math.ceil(count/50)} 
                variant="outlined" 
                page={cnt}
                onChange={(event,value)=>{setCnt(value)}}
            />
         </Stack>
        </div>
    )
    
};

export default Gallery;

export async function getStaticProps(){
    const count=(await getGigsCount()).data
    return{
        props:{
            count
        }
    }
}

