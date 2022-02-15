import React from 'react';
import {Skeleton} from "@mui/material"

const DashboardLoader = () => {
  return<div
      style={{overflowX:"hidden",height:"100vh",display:"grid",gridTemplateRows:"85% 15%"}}

  >
        <div 
            className='w-full grid grid-cols-2'
            style={{height:"calc(100vh - 10rem)"}}>
          <div className="m-20"
          >
             <Skeleton 
                animation="wave"
                variant="rectangular"
                className="h-full"
              />
         </div>
         <div className="m-20">
         {new Array(6).fill("").map((item,key)=>{
                        return(
                            <Skeleton
                            animation="wave"
                            key={key}
                            variant="rectangular"
                            height={50}
                            className="my-4 rounded"
                            width={"100%"}
                            />
                        )
                    })}
         </div>

      </div>
      <div>
        <Skeleton
         animation="wave"
         variant="rectangular"
         className="w-full h-full"
        />
      </div>
  </div> 
};

export default DashboardLoader;
