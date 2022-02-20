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
import TalentLoader from "../../components/global/TalentLoader"
import GetProfile from "../../components/utils/tools/getProfile";
import {isMobile} from "react-device-detect"

export default function SimpleSlider() {

    const settings = {
      dots: true,
      infinite:false,
      speed: 500,
      slidesToShow: isMobile?1:4,
      slidesToScroll: 1,
      lazyLoad: true,
      draggable:true
    };
    const {data:top10,error:top10Error}=useSWR('top10Talents',()=>getTop10Talents({category:"artworks"}))
    const {data:top10Photos,error:top10PhotosError}=useSWR('top10TalentsPhotos',()=>getTop10Talents({category:"photography"}))
    const {data:top10Others,error:top10OthersError}=useSWR('top10TalentsOthers',()=>getTop10Talents({category:"others"}))

    if(top10Error || top10PhotosError || top10OthersError){
        return <p>Error while fetching</p>
    }
    return (
      <>
          <Head>
                <title>Talent - Ikshvaku</title>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          </Head>
          <div className={`${styles.parentContainer}`}>

            <h2 className="text-2xl mb-8 mt-8 sm:mt-0">Artworks</h2>
            {
                !top10
                ?
                <TalentLoader/>
                :
                <div className={styles.slickContainer}>
                    <Slider {...settings}
                    >
                    {
                        top10.map((item,key)=>{
                            return(
                                <div 
                                    key={key}
                                    className={`${styles.slickBox} `} >
                                    <div className="m-2 bg-white rounded p-2 relative"
                                        style={{boxShadow:"1px 1px 10px rgba(0,0,0,0.164)"}}
                                    >
                                        <div className="absolute left-4 top-4 z-30">
                                            <GetProfile id={item.createdBy} />
                                        </div>
                                        <Image 
                                        src={item.imageList[0]}
                                        alt="Image Talents"
                                        layout="responsive"
                                        objectFit="cover"
                                        height="1"
                                        width="1"
                                        />
                                        <div className="flex justify-between p-2">
                                            <div>
                                                <p>{item.about.slice(0,25)}{item.about.length>25 && "..."}</p>
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
            }

            <h2 className="text-2xl my-8">Photography</h2>
            {
                !top10Photos
                ?
                <TalentLoader/>
                :
                <div className={styles.slickContainer}>
                    <Slider {...settings}>
                    {
                        top10Photos.map((item,key)=>{
                            return(
                                <div 
                                    key={key}
                                    className={`${styles.slickBox} `} >
                                    <div className="m-2 relative bg-white rounded  p-2 "
                                        style={{boxShadow:"1px 1px 10px rgba(0,0,0,0.164)"}}
                                    >
                                        <div className="absolute left-4 top-4 z-30">
                                            <GetProfile id={item.createdBy} />
                                        </div>
                                        <Image 
                                        src={item.imageList[0]}
                                        alt="Image Talents"
                                        layout="responsive"
                                        objectFit="cover"
                                        height="1"
                                        width="1"
                                        />
                                        <div className="flex justify-between p-2">
                                            <div>
                                                <p>{item.about.slice(0,25)}{item.about.length>25 && "..."}</p>
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
            }
            <h2 className="text-2xl my-8 ">Others</h2>
            {
                !top10Others
                ?
                <TalentLoader/>
                :
                <div className={styles.slickContainer}>
                    <Slider {...settings}
                    >
                    {
                        top10Others.map((item,key)=>{
                            return(
                                <div 
                                    key={key}
                                    className={`${styles.slickBox} `} >
                                    <div className="m-2 bg-white rounded p-2 relative"
                                        style={{boxShadow:"1px 1px 10px rgba(0,0,0,0.164)"}}
                                    >
                                        <div className="absolute left-4 top-4 z-30">
                                            <GetProfile id={item.createdBy} />
                                        </div>
                                        { ["jpeg","jpg","png","tiff"].includes(item.imageList[0].substring(item.imageList[0].lastIndexOf(".") + 1))
                                                ?
                                        <Image 
                                        src={item.imageList[0]}
                                        alt="Image Talents"
                                        layout="responsive"
                                        objectFit="cover"
                                        height="1"
                                        width="1"
                                        />
                                            :
                                        <video 
                                            controls
                                            controlsList="nodownload"
                                            style={{height:isMobile?"calc(95vw - 1rem)":"calc(25vw - 4.5rem )",objectFit:"cover"}}
                                            >
                                                <source src={item.imageList[0]}/>
                                            </video>
                                        }

                                        <div className="flex justify-between p-2">
                                            <div>
                                                <p>{item.about.slice(0,25)}{item.about.length>25 && "..."}</p>
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
            }
          </div>

      </>
    );
}