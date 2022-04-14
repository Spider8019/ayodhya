import { ArrowLeft } from '@mui/icons-material';
import axios from 'axios'
import { wrap } from 'lodash';
import React,{useEffect,useRef } from 'react'
import WFPlayer from 'wfplayer';


export const destroyInstance=(wf)=>{
  wf.destroy();
}
const VisulaizeMusic = ({url,duration}) => {

   const wRef=useRef(null)
   const aRef=useRef(null)

    useEffect(()=>{

      var wf = new WFPlayer({
        container:wRef.current,
        mediaElement:aRef.current,
        waveColor:"rgb(245,158,11)",
        backgroundColor:"rgba(253,230,138)",
        cursor:false,
        duration:100,
        progress:false,  
        padding: 1,
        grid:false,
        ruler:false
      });
      // or
      wf.load(url);

      return()=>{
        wf.destroy()
      }
    },[url])
  return (
    <>
    <div ref={wRef}  id="waveform" style={{height:"100%",width:"100%"}}></div>
    <audio src={url} className="border border-bg-red" ref={aRef} id="audio"></audio>
    </>
  )
}

export default VisulaizeMusic