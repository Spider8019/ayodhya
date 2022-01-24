import Image from 'next/image';
import React from 'react';
import styles from '../styles/Gallery.module.css'

const gallery = ({data}) => {
  return <div>
      <div  className={styles.galleryRow}>
          {
            new Array(5).fill("").map((arr,key)=>{
                return(
                    <div key={key} className={styles.galleryColumn}>
                        {
                            data.slice((data.length/5)*key,(data.length/5)*(key+1)).map((ind,index)=>{
                                return(
                                    <div key={index} className={styles.galleryImage}>
                                        <Image 
                                          layout='fill'
                                          objectFit='cover'
                                          src={ind.urls.full}
                                          alt={ind.urls.full}
                                        />       
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

export async function getStaticProps(){

    const res = await fetch("https://api.unsplash.com/photos/?client_id=DEjmfmm9pEN4Mk7Ww2G8zirF-Ah-R0PQZlSrCt4VBF4")
    const data = await res.json()
    console.log(data)
    return {
        props:{
            data
        }
    }
}

export default gallery;

