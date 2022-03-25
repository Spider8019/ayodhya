import axios from 'axios'
import React, { useEffect,useState,useRef } from 'react'
import useSWR, { mutate } from 'swr'
import  {getAudios,markLikeAndDislike,incrementView} from "../../globalSetups/api"
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import { IconButton } from '@mui/material';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import _ from "lodash"
import ActiveMusic from "../../components/layout/activeMusic"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LoaderPlayer from "../../components/global/LoaderPlayer"
import Head from "next/head"
import Image from 'next/image';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { getSession } from 'next-auth/react';
import NumberFormat from 'react-number-format';
import {notify, notifyerror} from "../../components/snackbar"
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import Mpb from '../../components/utils/tools/musicPlayerBreath';
import ShareDialog from "../../components/utils/dialogs/sharePage"
import Playlist from "../../components/utils/music/playlist"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { motion,AnimatePresence } from 'framer-motion';
import {playerAnimation,playerFullChildLeft,playerFullChildRight} from "../../globalSetups/framer"

const Audio = ({user}) => {
    
  const router=useRouter()
  const {query}=router
  const [showPlaylist,setShowPlaylist]=useState(parseInt(query.eye)>0?true:false)
  const {data:audios,error:audiosError}=useSWR("GetAllAudios"+query.mark,()=>getAudios({...query}))
  const timePlay=useRef(0)
  const [active,setActive]=useState({
      status:false,
      src:"",
      volume:0.5,
      playbackRate:1,
      trackId:Math.abs(parseInt(query.trackId))>3?0:Math.abs(parseInt(query.trackId)),
      about:"_____ _________ _______ ____________",
      trackBy:"____________ ________ ____"
  })
  const audioRef=useRef(null)
  const [current,setCurrent]=useState(0)

  useEffect(()=>{
    
    window.scrollTo(0, document.body.scrollHeight);    const interval=setInterval(()=>{
        if(!_.isNull(audioRef.current))
         setCurrent(audioRef.current.currentTime)
        if(audioRef.current && !audioRef.current.paused)
         timePlay.current+=1
        if(timePlay.current===30){
            incrementView({gigId:audios[active.trackId]._id})
        }
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
          <LoaderPlayer/>
          )
        }

    const changeSong = (audio,trackId)=>{
        
        timePlay.current=0;
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
        else{
            notifyerror("Volume is not valid. It should be in the range of 0 to 1.")
        }
    }


   return (
       <>
        <Head>
            <title>Music Player - Ikshvaku</title>
        </Head>

        <div
       id="player"
       className='relative'
       style={{userSelect:"none",overflowX:"hidden",height:"100vh",display:"grid"
       ,gridTemplateRows:isMobile?"90% 10%":"85% 15%"
        }}
       >
           <AnimatePresence>
           {
               showPlaylist
               ?
               <Playlist setShowPlaylist={setShowPlaylist}/>
               :
               <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={playerAnimation}
                    className='sm:grid flex flex-col sm:grid-cols-2 overflow-hidden'
                >
                    <motion.div 
                        variants={playerFullChildLeft}
                        className=' p-12 playerLeftContainer'>

                        <div 
                            className='h-full grid place-items-center  w-full'>
                            {/* <Cubes/> */}
                            <div>
                                <span 
                                    className=" signature text-2xl">Total Listens</span>
                                <NumberFormat
                                        value={audios[active.trackId].view}
                                        className="text-8xl text-center GFG text-white sm:text-transparent font-bold mt-4"
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                />
                            </div>
                        </div>

                    </motion.div>
                    <motion.div 
                        variants={playerFullChildRight}
                        className='relative -top-4 rounded-t-xl sm:rounded-none sm:static grid place-items-center bg-white sm:bg-slate-50 dark:sm:bg-black h-full'
                        style={{boxShadow:isMobile?"0px -10px 10px rgba(0,0,0,0.164)":"none"}}
                    >
                    <div className='sm:w-2/3 w-full mt-8 sm:mt-0 relative'
                        style={{height:isMobile?"100%":"90%"}}
                    > 
                        {audios.map((audio,key)=>{
                            return(
                                <div key={key}
                                    onClick={()=>changeSong(audio,key)}
                                    className={`${active.trackId===key?'bg-amber-100 activeMusic dark:bg-amber-800 shadow':'bg-transparent'} cursor-pointer border-b border-amber-500 p-2 flex justify-between items-center`}
                                >

                                    <div>
                                        <p className="text-sm">{audio.about.split("****")[0]}</p>
                                        <p className='text-xs'>{audio.createdBy.name}</p>
                                    </div>
                                    {
                                        active.trackId===key
                                        &&
                                        <div className='flex items-center'>
                                            <div className='ml-2'>
                                                <Mpb active={active.status}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    </motion.div>
               </motion.div>
           }
           </AnimatePresence>
            {/* player */}
            <div className=' px-2 sm:px-0 bg-amber-200 flex sm:grid sm:grid-cols-3 items-center sticky bottom-0'>
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
                <div className='flex items-center order-2 sm:-order-1'>
                    <IconButton
                        className='hidden sm:block'
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
                        style={{fontSize:isMobile?"2rem":"4rem"}}
                        />
                        :
                        <PlayArrowOutlinedIcon
                        style={{fontSize:isMobile?"2rem":"4rem"}}
                        />
                        }
                    </IconButton>
                    <IconButton
                        className='hidden sm:block'
                        disabled={active.trackId===audios.length-1?true:false}
                        onClick={()=>changeSong(audios[active.trackId+1],active.trackId+1)}
                    >
                        <SkipNextOutlinedIcon style={{fontSize:"2.5rem"}}/>
                    </IconButton>
                    <p className="hidden sm:block text-sm ml-4">{("0"+Math.floor(audioRef.current && audioRef.current.currentTime/60)).slice(-2)}:{("0"+Math.floor(audioRef.current && audioRef.current.currentTime%60)).slice(-2)}/{("0"+Math.floor(audioRef.current && audioRef.current.duration/60)).slice(-2)}:{("0"+Math.floor(audioRef.current && audioRef.current.duration%60)).slice(-2)}</p>
                </div>
                <div className="sm:justify-self-center grow flex items-center">
                    <Image src={audios[active.trackId].createdBy.availableImages[audios[active.trackId].createdBy.image]}
                        alt="profile image"
                        height={50}
                        width={50}
                        objectFit="cover"
                        className="rounded"
                    />
                    <div className="ml-4 grow">
                        <p className="whitespace-nowrap ">{isMobile?audios[active.trackId].about.split("****")[0].split(" ").slice(0,3).join(" "):audios[active.trackId].about.split("****")[0]}</p>
                        <p className="text-sm">{audios[active.trackId].createdBy.name}</p>
                    </div>
                    <div className='flex ml-2'>
                        {
                            !_.isEmpty(user)
                            &&
                            <>
                            <IconButton
                                onClick={()=>{
                                    markLikeAndDislike({likedBy:user.id,gigId:audios[active.trackId]._id})
                                    !audios[active.trackId].likedBy.includes(user.id) ? notify("Favourably received") : notify('Successfully despised')
                                }}
                            >
                                {audios[active.trackId].likedBy.includes(user.id) ? <ThumbUpAltIcon/> : <ThumbUpOutlinedIcon/>}
                            </IconButton>
                            <ShareDialog url={"/audio/"+audios[active.trackId].about.split("****")[0]}/>
                            </>

                        }
                    </div>
                </div>
                <div className="justify-self-end flex justify-end ">
                    <IconButton 
                        onClick={()=>setShowPlaylist(!showPlaylist)}
                    >
                        <ArrowDropUpIcon 
                            style={{transform:showPlaylist?"rotate(0deg)":"rotate(180deg)"}}
                        />
                    </IconButton>
                    <IconButton
                    onClick={()=>{
                        let audiosx=_.concat(_.shuffle(audios.slice(0,active.trackId)),audios[active.trackId],_.shuffle(audios.slice(active.trackId+1,)))
                        mutate("GetAllAudios",audios=audiosx,false)
                        }
                    }
                    >
                        <ShuffleIcon/>
                    </IconButton>
                    <IconButton 
                        className="hidden sm:flex"
                        onClick={()=>changeVolume(0)}>
                        <VolumeOffIcon/>
                    </IconButton>
                    <IconButton 
                        className="hidden sm:flex"
                        onClick={()=>changeVolume(1)}>
                        <VolumeUpIcon/>
                    </IconButton>
                    <input type="text"
                        className='hidden sm:flex outline-0 mr-2 text-sm w-6 text-center bg-transparent'
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


Audio.Layout=ActiveMusic

export async function getServerSideProps(context){
    const session = await getSession(context)
    return{
        props:{
            user:session ? session.user : {}
        }
    }
}