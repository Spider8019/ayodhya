import Image from 'next/image';
import React from 'react';
import styles from '../styles/Gallery.module.css'

const gallery = () => {
  const img={
      url:"/static/hero.jpg"
  }
  const array=new Array(24).fill(img)
  return <div>
      <div  className={styles.galleryRow}>
          {
            new Array(5).fill("").map((arr,key)=>{
                return(
                    <div key={key} className={styles.galleryColumn}>
                        {
                            array.slice(5*key,5*key+5).map((ind,index)=>{
                                return(
                                    <div key={index} className={styles.galleryImage}>
                                        <Image 
                                          layout='fill'
                                          objectFit='cover'
                                          src={index%2===0?img.url:"/static/hero3.jpg"}
                                          alt={img.url}
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

export default gallery;
