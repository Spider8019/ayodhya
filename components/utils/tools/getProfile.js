import React,{useEffect, useState} from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {profileById} from "../../../globalSetups/api"
import { IconButton } from '@mui/material';
import _ from "lodash"
import Image from 'next/image';
import Link from 'next/link';
import VerifiedIcon from '@mui/icons-material/Verified';
import {Box,LinearProgress} from '@mui/material';
import {isMobile} from "react-device-detect"


const GetProfile = ({id}) => {

  const [data,setData]=useState({})
  const [showing,setShowing]=useState(false)
  const getProfileById=async()=>{
      console.log("adfka;lk")
      setShowing(true)
      if(_.isEmpty(data)){
          const response =await profileById({id})
          setData(response)
      }
  }

  return (
    <div className="relative w-full" onMouseLeave={()=>setShowing(false)}>
        <IconButton onMouseEnter={getProfileById}
        >
            <PermIdentityIcon style={{fontSize:"20px",color:"white",cursor:"pointer"}}/>
        </IconButton>
        {
        showing
        &&
        <div className="absolute border dark:border-amber-800 top-0 bg-white dark:bg-black rounded"
            style={{width:isMobile?"calc(95vw - 4rem - 6px)":"calc(25vw - 4rem - 24px)",left:"0"}}
        >
            {_.isEmpty(data)
            ?
            <Box className='p-4'><LinearProgress /></Box>
            :
            <div className=' p-4'>
                <div className="flex item-center items-center">
                    <Image src={data.availableImages[data.image]}
                            className="rounded-full"
                            objectFit='cover'
                            alt="Image Icon"
                            width={40}
                            height={40}
                    />
                    <div className='ml-4'>
                        <div className='flex'>
                            <p className='text-sm'>{data.name}</p>
                            {data.isVerified && <VerifiedIcon style={{color:"#0080ff",marginLeft:"0.25rem",fontSize:"1.25rem"}}/>} 
                        </div>
                        <p className='text-xs'>{data.about}</p>
                    </div>
                </div>
                <Link href={`mailto:${data.email}`}>
                    <a className='basicDarkButton mt-4 block text-center'>
                        Send Email
                    </a>
                </Link>
            </div>
            }
        </div>
        }


    </div>
  )
}

export default GetProfile