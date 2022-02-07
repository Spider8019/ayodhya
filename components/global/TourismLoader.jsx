import React from 'react';
import {Skeleton} from "@mui/material"

const DashboardLoader = () => {
  return (
      <div className='m-20 grid grid-cols-4 gap-8'>
          {
              new Array(10).fill("").map((item,key)=>{
                  return(
                      <div key={key}>
                      <Skeleton 
                            className='rounded'
                            animation="wave" 
                            variant="rectangular" 
                            height={100}
                        />
                     </div>
                  )
              })
          }
          </div>
  )
};

export default DashboardLoader;
