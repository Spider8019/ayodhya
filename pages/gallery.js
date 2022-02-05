import Image from 'next/image';
import React, { useState,useEffect } from 'react';
import styles from '../styles/Gallery.module.css'
import { useSession } from 'next-auth/react';
import useSWR,{ useSWRConfig } from 'swr';
import { IconButton,Pagination,Stack } from '@mui/material';
import {galleryPosts,markLikeAndDislike,getGigsCount} from "../globalSetups/api"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import InterestsIcon from '@mui/icons-material/Interests';
import _ from "lodash"


export async function getStaticProps(){
    const count=(await getGigsCount()).data
    return{
        props:{
            count
        }
    }
}

function Page({mutate,page,session}){

    // const {data,error}=useSWR('FetchingDataForPage',()=>galleryPosts({page:page-1}))
    const {data,error}=useSWR([{url:'FetchingDataForPage',page:page-1}],galleryPosts)
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

    return <>
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
                                            <Image 
                                                className={styles.imageUnsized}
                                                layout="responsive"
                                                height={0}
                                                width={5000}
                                                objectFit='cover'
                                                src={ind.imageList[0]}
                                                alt={ind.imageList[0]}
                                                />
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
                                                    <IconButton className={"text-white"}>
                                                        <ShareIcon/>
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
        </>;

}


const Gallery = ({count}) => {
    
    const {data:session,status}=useSession()
    const { mutate } = useSWRConfig()
    
    const [cnt, setCnt] = useState(1)
        
    return(
        <div className="grid place-items-center mb-12">
         <Page mutate={mutate} page={cnt} session={session}/>
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
// import React from 'react';

// const gallery = () => {
//   return <div>gallery</div>;
// };

// export default gallery;
