import React,{useState} from 'react';
import {getSpecificGalleryPost} from "../../globalSetups/api"
import styles from "../../styles/Gallery.module.css"
import Image from 'next/image';
import {Avatar,IconButton} from "@mui/material"
import dateFormat from "dateformat"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareDialog from "../../components/utils/dialogs/sharePage"
import { getPostsOfProfile } from '../../globalSetups/api';
import Link from "next/link"

const Gallery = ({detail}) => {

  const [posts,setPosts]=useState([])
  const onLikeShowMore=async()=>{
      const data = await getPostsOfProfile({createdBy:detail.createdBy._id})
      if(data.status===200)
        setPosts(data.data)
  }


  return <div className={`${styles.specContainerParent}`}>
      <div className={`rounded overflow-hidden ${styles.specContainer}`}>
                <div 
                    className={`${styles.specImgContainer}`}
                >
                    <Image
                        className={styles.customimg}
                        layout="fill"
                        height={1}
                        width={1}
                        src={detail.imageList[0]}
                        alt="Image"
                    />
                </div>

            <div className={`${styles.specText}`}>
                <div className="flex p-2 border-b-2">
                   <div className='pl-2 flex items-center'>
                    <Avatar
                        src={detail.createdBy.image}
                        alt="Image posted by"
                        sx={{width:50,height:50}}
                    />
                    <p className="ml-4">{detail.createdBy.name}</p>
                   </div>
                </div>
                <div className="flex justify-between flex-col grow" style={{overflow:"auto"}}>
                    <div className="p-4 ">
                        <p className="text-xs mb-4">{dateFormat(detail.createdAt,"fullDate")}</p>
                        <p>{detail.about}</p>
                    </div>
                    {
                        posts.length>1
                        &&
                        <div className={styles.morePostsSpec}>
                        {
                        posts && posts.map(item=>{
                                return(
                                    item._id!==detail._id
                                    &&
                                    <Link
                                        href={"/gallery/"+item._id}
                                        key={item._id}
                                        scroll={false}
                                    >
                                        <a>
                                            <Image 
                                                src={item.imageList[0]}
                                                alt={item.about}
                                                layout="responsive"
                                                height={100}
                                                width={100}
                                                objectFit='cover'
                                            />
                                        </a>
                                    </Link>    
                                    )
                                })
                            }
                        </div>
                    }
                    
                </div>
                <div className="border-t-2 p-2 flex justify-between">
                    <div className="flex items-center">
                        <IconButton
                          onClick={onLikeShowMore}
                        >
                            <FavoriteBorderIcon/>
                        </IconButton>
                        <p className="pl-2">{detail.likedBy.length}</p>
                    </div>
                    <ShareDialog/>
                </div>
            </div>
      </div>
      {/* {console.log(detail)}
     {detail.about} */}
  </div>;
};

export async function getServerSideProps(context){

    const {params}=context
    const data=(await getSpecificGalleryPost({gigId:params.gallery})).data
    return {
        props:{
            detail:data
        }
    }
}

export default Gallery;
