import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { getTourismBlogs } from '../../globalSetups/api';
import { availableTravelBlogType } from '../../globalSetups/availableArrays';
import TourismLoader from "../../components/global/TourismLoader"
import Head from "next/head"
import { useRouter } from 'next/router';
import { IconButton,Tooltip } from '@mui/material';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import HiveOutlinedIcon from '@mui/icons-material/HiveOutlined';import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
const Tourism = () => {
  
  const router=useRouter()
  console.log(router.query.query)
  const {data,error}=useSWR("fetchDataForTourismPage"+router.query.query,()=>getTourismBlogs({query:router.query.query}))
  if(!data){
      return <TourismLoader/>
  }
  if(error){
      return <h1>There is some error</h1>
  }
  return <>
        <Head>
            <title>Writings - Ikshvaku</title>
        </Head>

        <div className='mx-auto flex w-1/4 text-xs self-center justify-center mt-8'>

            <Tooltip title="Latest">
                <IconButton onClick={()=>router.push("?query=any")}>
                    <HiveOutlinedIcon className={router.query.query==="any"&&"text-amber-500"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Temples">
                <IconButton onClick={()=>router.push("?query=4")}>
                    <TempleHinduOutlinedIcon className={router.query.query==="4"&&"text-amber-500"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Hotels">
                <IconButton onClick={()=>router.push("?query=1")}>
                    <LuggageIcon className={router.query.query==="1"&&"text-amber-500"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Shopping Centers">
                <IconButton onClick={()=>router.push("?query=3")}>
                    <LocalGroceryStoreOutlinedIcon className={router.query.query==="3"&&"text-amber-500"}/>
                </IconButton>         
            </Tooltip>
            <Tooltip title="Parks">
                <IconButton onClick={()=>router.push("?query=2")}>
                    <ParkOutlinedIcon className={router.query.query==="2"&&"text-amber-500"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Restaurants and Kitchens">
                <IconButton onClick={()=>router.push("?query=0")}>
                    <DinnerDiningOutlinedIcon className={router.query.query==="0"&&"text-amber-500"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Personal Blogs">
                <IconButton onClick={()=>router.push("?query=personal")}>
                    <PersonPinCircleOutlinedIcon className={router.query.query==="personal"&&"text-amber-500"}/>
                </IconButton>
            </Tooltip>
        </div>
        <div className="m-8 sm:m-20 sm:mt-8 grid grid-cols-1 sm:min-h-screen sm:grid-cols-4 gap-8">
            {
            data.data.length===0
            ?
            <h1>Nothing to Show</h1>
            :
            data.data && data.data.map((item,key)=>{
                return(
                    <Link href={`/tourism/${item._id}`}
                    key={key}>
                        <a
                            className=" paper grid py-4 px-8 items-center rounded border-2 h-fit border-amber-500"
                            style={{gridTemplateColumns:"60px 1fr"}}
                        >
                            {
                                router.query.query!=="personal"
                                &&                            
                                <div className='rounded relative'>
                                    <Image
                                    alt="Image"
                                    src={"/static/"+availableTravelBlogType[parseInt(item.tourismType)].icon}
                                    layout="responsive"
                                    height={1}
                                    width={1}
                                    />
                                </div>
                            }
                            <div className="ml-4  w-full overflow-hidden">
                                <p className="truncate text-xs ">{item.location}</p>
                                <p className='truncate'>{item.heading}</p>
                                <p className='text-xs'>{item.totalLikes} Likes</p>
                            </div>
                        </a>
                    </Link>
                )
            })}
        </div>

      </>;
};

export default Tourism;
