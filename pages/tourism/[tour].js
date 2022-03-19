import React,{useState} from 'react';
import { getSpecificBlog,markLikeAndDislikeBlog } from '../../globalSetups/api';
import axios from "axios"
import ReactHtmlParser from 'react-html-parser';
import styles from "../../styles/pages/Tourism.module.css"
import Image from 'next/image';
import Link from 'next/link';
import InterestsIcon from '@mui/icons-material/Interests';
import dateFormat from "dateformat";
import {IconButton} from "@mui/material"
import ShareBox from "../../components/utils/dialogs/sharePage.js"
import Head from "next/head"
import { useRouter } from 'next/router';
import { getSession,useSession } from 'next-auth/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';



const TourSpecific = ({detail,about}) => {

  const router=useRouter()
  const {data:session,status}=useSession()
  const [like,setLike]=useState(session && detail.likedBy.includes(session.user.id))
  const [likedBy,setLikedBy]=useState(detail.likedBy.length)



  return <div>
        <Head>
            <title>{detail.heading + " by " + detail.createdBy.name + " -\nIkshvaku Ayodhya"}</title>
            <meta name="description" content={likedBy + "Likes. Click to read it. Developed by Spider8019"}/>
            <meta name="keywords" content={detail.heading}/>
        </Head>
        <div className="m-4 sm:m-20">
            <div className={`${styles.mainBody}`}>
                <div>
                    <div>
                        <p className="text-center sm:text-left text-amber-500 text-4xl font-semibold">
                            {detail.heading}
                        </p>
                        <div className="my-8 flex flex-col sm:flex-row items-center justify-between">
                            <div>
                                <p className="text-sm">{detail.location}</p>
                                <p className="text-xs">Posted on {dateFormat(detail.createdAt,"fullDate")}</p>
                            </div>
                            <div className="flex my-4 items-center">
                                    <ShareBox  url={router.asPath} title={detail.heading+"\n"+detail.location+". To read more click on the following link"}/>
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
                                    {
                                        session
                                        &&
                                        <IconButton
                                            onClick={()=>{
                                                markLikeAndDislikeBlog({likedBy:session.user.id,gigId:detail._id});
                                                setLike(!like)
                                                like ? setLikedBy(likedBy-1) : setLikedBy(likedBy+1)
                                            }}
                                            > 
                                                {session && like? <FavoriteIcon style={{color:"#f59e0b"}}/> : <FavoriteBorderIcon/>}
                                        </IconButton>
                                    }
                                    <p className="px-2">{likedBy}</p>
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
                       <div className={`${styles.aboutWriterContainer} grid`}>
                            <Image
                                className='rounded'
                                src={detail.createdBy.availableImages[detail.createdBy.image]}
                                alt="Blog Writer Avatar"
                                width={100}
                                height={100}
                                objectFit='cover'
                                objectPosition={"center"}
                                />
                            <div>
                                <p>{detail.createdBy.name} {detail.createdBy.isVerified&&<VerifiedIcon className="text-xl text-[#0080ff]" />}</p>
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
