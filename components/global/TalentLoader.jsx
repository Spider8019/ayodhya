import React from 'react';
import {Skeleton} from "@mui/material"

const DashboardLoader = () => {
  return (
    <div className='grid m-20' style={{ height: "calc(100vh - 2rem)", gridTemplateColumns: "repeat(4,1fr)" }}>

            {
                new Array(4).fill("").map((item,key)=>{
                    return(
                        <Skeleton
                            key={key}
                            className="mx-4 rounded"
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
