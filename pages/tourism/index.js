import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { getTourismBlogs } from '../../globalSetups/api';
import { availableTravelBlogType } from '../../globalSetups/availableArrays';
import TourismLoader from "../../components/global/TourismLoader"
import Head from "next/head"

const Tourism = () => {
  
  const {data,error}=useSWR("fetchDataForTourismPage",getTourismBlogs)
  if(!data){
      return <TourismLoader/>
  }
  if(error){
      return <h1>There is some error</h1>
  }
  return <>
        <Head>
            <title>Tourism - Ikshvaku</title>
        </Head>
        <div className="m-8 sm:m-20 grid grid-cols-1 min-h-screen sm:grid-cols-4 gap-8">
            {data.data && data.data.map((item,key)=>{
                return(
                    <Link href={`/tourism/${item._id}`}
                    key={key}>
                        <a
                            className=" paper flex py-4 px-8 items-center rounded border-2 h-fit border-amber-500"
                        >
                            <div className='rounded'>
                                <Image
                                  alt="Image"
                                  src={"/static/"+availableTravelBlogType[parseInt(item.tourismType)].icon}
                                  height="80"
                                  width="80"
                                />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs">{item.location}</p>
                                <p>{item.heading}</p>
                            </div>
                        </a>
                    </Link>
                )
            })}
        </div>

      </>;
};

export default Tourism;
