import React from 'react'
// import Map from "@arcgis/core/Map";
import { Map } from '@esri/react-arcgis';
import Points from "./Layers/Points"


const Esri = ({height="calc(80vh - 74px)",list=[]}) => {

  return (
    <div style={{height:height,width:"100%"}}
    >
        <Map
          mapProperties={{basemap:"hybrid"}}
          viewProperties={{
            center: [82.19463631064608,26.79579352561889],
            zoom: 10
          }}
        >
          <Points list={list}/>
        </Map>
    </div>
  )
}

export default Esri