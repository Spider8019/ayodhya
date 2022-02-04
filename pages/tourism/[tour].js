import React from 'react';
import { getSpecificBlog } from '../../globalSetups/api';
import axios from "axios"
import ReactHtmlParser from 'react-html-parser';
import styles from "../../styles/pages/Tourism.module.css"
import Image from 'next/image';
import Link from 'next/link';
import InterestsIcon from '@mui/icons-material/Interests';
import dateFormat from "dateformat";
import {IconButton} from "@mui/material"
import ShareBox from "../../components/utils/dialogs/sharePage.js"

const TourSpecific = ({detail,about}) => {
  return <div>
        <div className="m-20">
            <div className={`${styles.mainBody}`}>
                <div>
                    <div>
                        <p className="text-amber-500 text-4xl font-semibold">
                            {detail.heading}
                        </p>
                        <div className="my-8 flex items-center justify-between">
                            <div>
                                <p className="text-sm">{detail.location}</p>
                                <p className="text-xs">Posted on {dateFormat(detail.createdAt,"fullDate")}</p>
                            </div>
                            <div className="flex my-4 items-center">
                                    <ShareBox/>
                                    <Link href={detail.about}
                                    >
                                        <a 
                                          className="mx-2"
                                          target="_blank">
                                        <IconButton 
                                        >
                                            <InterestsIcon/>
                                        </IconButton>
                                        </a>
                                    </Link>
                                    <p className='mx-2'>{detail.likedBy.length} Liked</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className='mt-8'
                        suppressContentEditableWarning={true}
                    >{ReactHtmlParser(JSON.parse(about))}</div>
                    
                </div>
                <div className={`${styles.aboutContainer} rounded`}>
                   <div>
                       <div className={`${styles.aboutWriterContainer} grid `}>
                            <Image
                                className='rounded'
                                src={detail.createdBy.image}
                                alt="Blog Writer Avatar"
                                width={100}
                                height={100}
                                objectFit='cover'
                                objectPosition={"center"}
                                />
                            <div>
                                <p>{detail.createdBy.name}</p>
                                <p className='text-xs'>{detail.createdBy.about.slice(0,50)}{detail.createdBy.about.length>50 && "..."}</p>
                            </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
      </div>;
};

export default TourSpecific;

export async function getServerSideProps(context){
    const {params} = context;
    const data = (await getSpecificBlog({tourId:params.tour})).data
    const about = (await axios.get(`${data.about}`)).data
    return {
        props:{
            detail:data,
            about:JSON.stringify(about)
        }
    }
}
