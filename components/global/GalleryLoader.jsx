import React from 'react';
import {Skeleton} from "@mui/material"
import {isMobile} from "react-device-detect"

const DashboardLoader = () => {
  return <div style={{margin:"5rem auto",width:"90vw"}}>
          <div className="grid my-8 grid-cols-1 sm:grid-cols-5 gap-4 "
          >
                     {new Array(isMobile?1:10).fill("").map((item,key)=>{
                        return(
                            <Skeleton
                            animation="wave"
                            key={key}
                            className="rounded"
                            variant="rectangular"
                            height={200}
                            width={"100%"}
                            />
                        )
                    })}
         </div>

      </div>
};

export default DashboardLoader;
