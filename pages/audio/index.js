import axios from 'axios'
import React, { useEffect,useState,useRef } from 'react'
import useSWR, { mutate } from 'swr'
import  {getAudios} from "../../globalSetups/api"
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import { IconButton } from '@mui/material';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import _ from "lodash"
import Script from 'next/script'
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';    
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import Cubes from "../../components/three"
import Head from "next/head"
import Image from 'next/image';

const Audio = () => {

  const [shuffled,setShuffled]=useState([])
  const {data:audios,error:audiosError}=useSWR("GetAllAudios",()=>getAudios())
  const [active,setActive]=useState({
      status:false,
      src:"",
      volume:0.5,
      playbackRate:1,
      trackId:0,
      about:"_____ _________ _______ ____________",
      trackBy:"____________ ________ ____"
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

  useEffect(()=>{

  },[shuffled])
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


    const changeSong = (audio,trackId)=>{
        
        if(trackId===active.trackId)
            togglePlay()
        else{
            audioRef.current.src=audio.imageList[0]
            setActive({...active,trackBy:audio.createdBy.name,about:audio.about,status:true,trackId:trackId,src:audio.imageList[0]})
        }

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
    // const audioContext = new AudioContext();
    // const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(audioRef.current);
    // const analyserNode = audioContext.createAnalyser();
    // mediaStreamAudioSourceNode.connect(analyserNode);
 


   return (
       <>
        <Head>
            <title>Music Player - Ikshvaku</title>
        </Head>
        <div
       id="player"
       style={{overflowX:"hidden",height:"100vh",display:"grid",gridTemplateRows:"85% 15%"}}
       >
{console.log(audioRef.current)}
            <div
                className='grid grid-cols-2'
            >
                <div className='m-12'>

                    <audio controls
                        volume={active.volume}
                        style={{display:"none"}}
                        ref={audioRef}
                        src={audios[active.trackId].imageList[0]}
                        onCanPlay={()=>active.status ? audioRef.current.play() :console.log(active.status)}
                        onEnded={()=>{
                            if(active.trackId===audios.length-1)
                                setActive({...active,trackBy:audios[0].createdBy.name,about:audios[0].about,src:audios[0].imageList[0],trackId:0})
                            else
                                setActive({...active,trackBy:audios[active.trackId+1].createdBy.name,about:audios[active.trackId].about,src:audios[active.trackId+1].imageList[0],trackId:active.trackId+1})
                        }}
                    />
                    <div className='h-full w-full'>
                        <Cubes/>
                    </div>
                </div>
               <div className='grid place-items-center bg-slate-50'>
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
                        transform:"translate(-50%,-6px)",
                        left:(current/(audioRef.current ? audioRef.current.duration : 1))*100+"%"}}
                        className="seekToButton absolute h-4 w-4 bg-amber-500 rounded-full">
                    </div>
                </div>
                <div className='flex items-center'>
                    <IconButton
                        disabled={active.trackId===0?true:false}
                        onClick={()=>changeSong(audios[active.trackId-1],active.trackId-1)}
                    >
                        <SkipPreviousOutlinedIcon style={{fontSize:"2.5rem"}}/>
                    </IconButton>
                    <IconButton
                      onClick={togglePlay}
                    >
                        {active.status
                        ?
                        <PauseOutlinedIcon
                        style={{fontSize:"4rem"}}
                        />
                        :
                        <PlayArrowOutlinedIcon
                        style={{fontSize:"4rem"}}
                        />
                        }
                    </IconButton>
                    <IconButton
                        disabled={active.trackId===audios.length-1?true:false}
                        onClick={()=>changeSong(audios[active.trackId+1],active.trackId+1)}
                    >
                        <SkipNextOutlinedIcon style={{fontSize:"2.5rem"}}/>
                    </IconButton>
                    <p className="text-sm ml-4">{("0"+Math.floor(audioRef.current && audioRef.current.currentTime/60)).slice(-2)}:{("0"+Math.floor(audioRef.current && audioRef.current.currentTime%60)).slice(-2)}/{("0"+Math.floor(audioRef.current && audioRef.current.duration/60)).slice(-2)}:{("0"+Math.floor(audioRef.current && audioRef.current.duration%60)).slice(-2)}</p>
                </div>
                <div className="justify-self-center flex items-center">
                    <Image src={audios[active.trackId].createdBy.availableImages[audios[active.trackId].createdBy.image]}
                        alt="profile image"
                        height={50}
                        width={50}
                        objectFit="cover"
                        className="rounded"
                    />
                    <div className="ml-4">
                        <p>{audios[active.trackId].about}</p>
                        <p className="text-sm">{audios[active.trackId].createdBy.name}</p>
                    </div>
                </div>
                <div className="justify-self-end">
                    <IconButton
                    onClick={()=>{
                        let audiosx=_.concat(_.shuffle(audios.slice(0,active.trackId)),audios[active.trackId],_.shuffle(audios.slice(active.trackId+1,)))
                        mutate("GetAllAudios",audios=audiosx,false)
                        }
                    }
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