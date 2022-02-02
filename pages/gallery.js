import Image from 'next/image';
import React from 'react';
import styles from '../styles/Gallery.module.css'
import useSWR from 'swr';
import {galleryPosts} from "../globalSetups/api"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const Gallery = () => {

  const {data,error}=useSWR("fetchGallery",galleryPosts)
  
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
  return <div>
      {console.log(data)}
      <div  className={styles.galleryRow}>
          {
            new Array(5).fill("").map((arr,key)=>{
                return(
                    <div key={key} className={styles.galleryColumn}>
                        {
                            data.data.slice((data.data.length/5)*key,(data.data.length/5)*(key+1)).map((ind,index)=>{
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
                                            <div>
                                                <p>{ind.about.slice(0,25)+(ind.about.length>=25?"...":"")}</p>
                                                <p className='text-xs'>{ind.createdBy.name}</p>
                                            </div>
                                            <div className={styles.galleryImgButtons}>
                                                <FavoriteBorderIcon/>
                                                <ShareIcon/>
                                            </div>
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
  </div>;
};
{/* <div >
  <Image
    alt='Mountains'
    src='/mountains.jpg'
    layout='fill'
    objectFit='contain'
  />
</div> */}
// export async function getStaticProps(){

//     const res = 
//     return {
//         props:{
//             data
//         }
//     }
// }

export default Gallery;

