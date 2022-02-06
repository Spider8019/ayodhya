import React from 'react';
import {Skeleton} from "@mui/material"

const DashboardLoader = () => {
  return (
      <div className='m-4'>
          {
              new Array(2).fill("").map((item,key)=>{
                  return(
                      <div key={key}>
                      <Skeleton 
                            className='rounded'
                            animation="wave" 
                            variant="text" 
                        />
                        <div className="">
                        <Skeleton 
                            className='rounded'
                            animation="wave" 
                            variant="rectangular" 
                            height={100}
                        />
                            <Skeleton 
                            className='rounded'
                            animation="wave" 
                            variant="text" 
                            />
                        </div>
                     </div>
                  )
              })
          }
          </div>
  )
};

export default DashboardLoader;
