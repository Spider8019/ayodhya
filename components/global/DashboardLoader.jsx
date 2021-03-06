import React from 'react';
import {Skeleton} from "@mui/material"
import { isMobile } from 'react-device-detect';

const DashboardLoader = () => {
  return <div className="m-4">

      <div>
          <Skeleton 
            className='rounded'
            animation="wave" 
            variant="rectangular" 
            width={"100%"} 
            height={150}/>
          <div className="rounded my-4 w-full sm:w-2/4">
              <Skeleton
               className="rounded"
               height={40}
               animation="wave"
               variant="h1"
              />
              <Skeleton
               className="mt-1 rounded"
               animation="wave"
               variant="text"
              />
          </div>
          <div className="grid my-8"
              style={{gridTemplateColumns:isMobile?"1fr":"0.75fr 0.25fr"}}
          >
              <div>
                <p className='text-xl mb-4'>Your Creation</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:px-4">
                    {new Array(4).fill("").map((item,key)=>{
                        return(
                            <Skeleton
                            animation="wave"
                            key={key}
                            className="rounded"
                            variant="rectangular"
                            height={250}
                            width={"100%"}
                            />
                        )
                    })}
                </div>
              </div>
              <div>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className='rounded'
                    width={"100%"}
                  />
              </div>
          </div>

      </div>

  </div>;
};

export default DashboardLoader;
