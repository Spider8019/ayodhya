import React from 'react';
import {Skeleton} from "@mui/material"
import {isMobile} from "react-device-detect"

const DashboardLoader = () => {
  return (
    <div className='grid my-12' style={{ height: isMobile?"fit-content":"calc(100vh - 2rem)", gridTemplateColumns: isMobile?"1fr":"repeat(4,1fr)" }}>

            {
                new Array(isMobile?1:4).fill("").map((item,key)=>{
                    return(
                        <Skeleton
                            key={key}
                            className="mx-2 rounded"
                            height={300}
                            variant='rectangular'
                            animation="wave"
                        />
                    )
                })
            }

  </div>

  )
};

export default DashboardLoader;
