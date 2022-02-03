import React from 'react';
import useSWR from 'swr';
import { getTourismBlogs } from '../globalSetups/api';

const Tourism = () => {
  
  const {data,error}=useSWR("fetchDataForTourismPage",getTourismBlogs)
  if(!data){
      return <h1>Loading ...</h1>
  }
  if(error){
      return <h1>There is some error</h1>
  }
  return <>
        <div className="m-20 grid grid-cols-4 gap-8">
            {data.data && data.data.map((item,key)=>{
                return(
                    <div key={key}
                        className="py-4 px-8 rounded bg-amber-100"
                    >
                        <p className="text-xs">{item.location}</p>
                        <p>{item.heading}</p>
                    </div>
                )
            })}
        </div>
      </>;
};

export default Tourism;
