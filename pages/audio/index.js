import axios from 'axios'
import React, { useEffect,useState,useRef } from 'react'
import useSWR from 'swr'
import  {getAudios} from "../../globalSetups/api"
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import { IconButton } from '@mui/material';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import _ from "lodash"
import Script from 'next/script'
import jsmediatags from 'jsmediatags-web'
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';    
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
const albumArt = require( 'album-art' )

const Audio = () => {

  const {data:audios,error:audiosError}=useSWR("GetAllAudios",()=>getAudios())
  const [active,setActive]=useState({
      status:false,
      src:"https://ikshvaku-s3.s3.ap-south-1.amazonaws.com/spider8019J4LFGPBLU2.mp3",
      volume:0.5,
      playbackRate:1,
      trackId:-1,
      about:"_____ _________ _______ ____________",
      trackBy:"____________"
  })
  const audioRef=useRef(null)
  const [current,setCurrent]=useState(0)

  useEffect(()=>{
    
    const interval=setInterval(()=>{
        if(!_.isNull(audioRef.current))
         setCurrent(audioRef.current.currentTime)
    },1000)


    return ()=>clearInterval(interval)
  })
  const togglePlay=()=>{
      if(audioRef.current.paused)
        audioRef.current.play()
      else
         audioRef.current.pause()
      setActive({...active,status:!active.status})
  }


  if(audiosError){
      return(
          <p>{audiosError}</p>
      )
  }
  if(!audios){
      return(
          <p>Loading...</p>
          )
        }

        // (async()=>{
        //     const data=await axios.get(audios[0].imageList[0])
        //     var x=new Blob([data.data],{type:"audio/mp3"})
        //     console.log(x)
        //     console.log(URL.createObjectURL(x))

        //     // alert(data)
        // })();



    const changeSong = (audio,trackId)=>{
        console.log(trackId,active.trackId)
        if(trackId===active.trackId)
            togglePlay()
        else{
            console.log(audioRef.current)
            audioRef.current.src=audio.imageList[0]
            setActive({...active,trackBy:audio.createdBy.name,about:audio.about,status:true,trackId:trackId,src:audio.imageList[0]})
        }
        // togglePlay()
    }
    const seekTo=(e)=>{
        var rect = e.target.getBoundingClientRect();
        audioRef.current.currentTime=(e.clientX/window.innerWidth)*audioRef.current.duration
    }
    const changeVolume=(vol)=>{
        if(vol<=1 && vol>=0){
            audioRef.current.volume=vol;
            setActive({...active,volume:vol})
        }
    }
 


   return (
       <>

        <div
       id="player"
       style={{overflowX:"hidden",height:"100vh",display:"grid",gridTemplateRows:"85% 15%"}}
       >

            <div
                className='grid grid-cols-2'
            >
                <div className='m-12'>
                    <audio controls
                        volume={active.volume}
                        style={{display:"none"}}
                        ref={audioRef}
                        src={active.src}
                        onCanPlay={()=>audioRef.current.play()}
                        onEnded={()=>{
                            if(active.trackId===audios.length-1)
                                setActive({...active,src:audios[0].imageList[0],trackId:0})
                            else
                                setActive({...active,src:audios[active.trackId+1].imageList[0],trackId:active.trackId+1})
                        }}
                    />
                    <div className='bg-amber-500 h-2/4 w-full'>
                        daf;slkdfj
                    </div>
                </div>
               <div className='grid place-items-center'>
                   <div className='w-2/3'
                    style={{height:"90%"}}
                   > 
                    {audios.map((audio,key)=>{
                        return(
                            <div key={key}
                                onClick={()=>changeSong(audio,key)}
                                className={`${active.trackId===key?'bg-amber-100':'bg-transparent'} cursor-pointer border-b border-amber-500 p-2`}
                            >
                                <div>
                                    <p className="text-sm">{audio.about.slice(0,75)}</p>
                                    <p className='text-xs'>{audio.createdBy.name}</p>
                                </div>
                            </div>
                        )
                    })}
                   </div>
               </div>
            </div>
            <div className=' bg-amber-200 grid grid-cols-3 items-center relative'>
                <div 
                    onClick={seekTo}
                    className='progressBarContainer bg-amber-300 absolute top-0 left-0 w-full h-1 cursor-pointer'>
                    <div className="bg-amber-500 top-0 left-0 h-full absolute"
                        style={{width:(current/(audioRef.current ? audioRef.current.duration : 1))*100+"%"}}
                    >
                    </div>
                    <div 
                        style={{
                        transform:"translate(-100%,-6px)",
                        left:(current/(audioRef.current ? audioRef.current.duration : 1))*100+"%"}}
                        className="seekToButton absolute h-4 w-4 bg-amber-500 rounded-full">
                    </div>
                </div>
                <div className='flex items-center'>
                    <IconButton>
                        <SkipPreviousOutlinedIcon className="text-4xl text-amber-500"/>
                    </IconButton>
                    <IconButton
                      onClick={togglePlay}
                    >
                        {active.status
                        ?
                        <PauseOutlinedIcon
                        className='text-6xl text-amber-500'
                        />
                        :
                        <PlayArrowOutlinedIcon
                            className='text-6xl text-amber-500'
                        />
                        }
                    </IconButton>
                    <IconButton>
                        <SkipNextOutlinedIcon  className="text-4xl text-amber-500"/>
                    </IconButton>
                    <p className="text-sm ml-4">{("0"+Math.floor(audioRef.current && audioRef.current.currentTime/60)).slice(-2)}:{("0"+Math.floor(audioRef.current && audioRef.current.currentTime%60)).slice(-2)}/{("0"+Math.floor(audioRef.current && audioRef.current.duration/60)).slice(-2)}:{("0"+Math.floor(audioRef.current && audioRef.current.duration%60)).slice(-2)}</p>
                </div>
                <div className="justify-self-center">
                    <p>{active.about}</p>
                    <p className="text-sm">{active.trackBy}</p>
                </div>
                <div className="justify-self-end">
                    <IconButton
                    onClick={()=>console.log(_.shuffle(audios))}
                    >
                        <ShuffleIcon/>
                    </IconButton>
                    <IconButton onClick={()=>changeVolume(0)}>
                        <VolumeOffIcon/>
                    </IconButton>
                    <IconButton onClick={()=>changeVolume(0.33)}>
                        <VolumeMuteIcon/>
                    </IconButton>
                    <IconButton onClick={()=>changeVolume(0.66)}>
                        <VolumeDownIcon/>
                    </IconButton>
                    <IconButton onClick={()=>changeVolume(1)}>
                        <VolumeUpIcon/>
                    </IconButton>
                    <input type="text"
                        className='outline-0 mr-2 text-sm w-6 text-center bg-transparent'
                        value={active.volume}
                        onChange={e=>changeVolume(e.target.value)}
                    />
                </div>
            </div>
      </div>
      <style jsx>{`
        .seekToButton::after {
            content:"";
            position:absolute;
            top:-25%;
            left:-25%;
            bottom:-25%;
            right:-25%;
            background:rgba(255,255,255,0.3);
            z-index:-1;
            border-radius:50%;
            opacity:0;
            transition:all 0.1s ease;
        }
        .progressBarContainer:hover .seekToButton::after{
            opacity:1;
        }
      `}</style>
       </>

  )
}

export default Audio