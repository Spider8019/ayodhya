import React, { Component } from "react";
import Slider from "react-slick";
import Head from "next/head";
import styles from "../../styles/pages/Talent.module.css"
import useSWR  from "swr";
import {getTop10Talents} from "../../globalSetups/api"
import dateFormat from "dateformat";
import Image from "next/image"
import millify from "millify";
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareDialog from "../../components/utils/dialogs/sharePage"

export default function SimpleSlider() {

    const settings = {
      dots: true,
      infinite:false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    const {data:top10,error:top10Error}=useSWR('top10Talents',()=>getTop10Talents())

    if(!top10)
       return <h1>loading</h1>
    if(top10Error){
        return <p>error while fetching</p>
    }
    return (
      <>
          <Head>
                <title>Talent - Ikshvaku</title>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          </Head>
          <div className={`my-20 ${styles.parentContainer}`}>

            <h2 className="text-2xl mb-8">Artworks</h2>
            <div className={styles.slickContainer}>
                <Slider {...settings}>
                {
                    top10.map((item,key)=>{
                        return(
                            <div 
                                key={key}
                                className={`${styles.slickBox} `} >
                                <div className="m-2 bg-slate-100 rounded overflow-hidden p-2">
                                    <Image 
                                    src={item.imageList[0]}
                                    alt="Image Talents"
                                    layout="responsive"
                                    height="1"
                                    width="1"
                                    />
                                    <div className="flex justify-between p-2">
                                        <div>
                                            <p>{item.about.slice(0,75)}{item.about.length>75 && "..."}</p>
                                            <p className="text-xs">{dateFormat(item.createdAt,"fullDate")}</p>
                                        </div>
                                        <div className="flex flex-col pl-2">
                                            <div className="flex items-center justify-end">
                                                <p className='pr-2'>{millify(item.view)}</p>
                                                <FilterTiltShiftIcon/>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <p className='pr-2'>{millify(item.length.likedBy)}</p>
                                                <FavoriteBorderIcon/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </Slider>
            </div>

        </div>
      </>
    );
}