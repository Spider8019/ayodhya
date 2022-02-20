import React from 'react';
import {Skeleton} from "@mui/material"

const DashboardLoader = () => {
  return (
    <div className='grid' style={{ height: "calc(100vh - 2rem)", gridTemplateRows: "auto 1fr auto" }}>

    <div className="flex justify-between">
      <p className='text-2xl'>Tabulate</p>
      <div>
        <Skeleton 
                className='rounded w-40'
                animation="wave" 
                variant="rectangular" 
            />
        <Skeleton 
            className='rounded w-20 mt-2 h-2'
            animation="wave" 
            variant="rectangular" 
        />
      </div>
    </div>
    <div
      className='grid my-12 items-center '
      style={{ gridTemplateColumns: "auto 250px" }}
    >
      <div className="w-full h-full">
            <Skeleton 
                className='rounded'
                animation="wave" 
                variant="rectangular" 
                height={420}
            />
        <div>
        </div>
      </div>
      <div className={` self-stretch rounded-2xl ml-4 `}>
        <Skeleton 
            className='rounded h-full w-full'
            animation="wave" 
            variant="rectangular" 
            height={420}
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {["","",""].map((item, key) => {
        return (
          <div
            key={key}
          >
            <Skeleton 
                className="rounded w-full"
                animation="wave" 
                variant="rectangular" 
                height={100}
            />
          </div>
        )
      })}
    </div>

  </div>

  )
};

export default DashboardLoader;
