import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ActiveMusic from "../../layout/activeMusic"
import { motion } from 'framer-motion'
import { pTransition } from '../../../globalSetups/framer'

const PlayList = ({setShowPlaylist}) => {

  const fPA=[{
    id:1,
    url:'/audio?about=Holi&eye=-8019&showRelated=true&mark=1&trackId=0',
    imgUrl:'/static/pages/pHoli.png'
    },{
    id:2,
    url:'/audio?about=diwali&eye=-8019&showRelated=true&mark=2&trackId=0',
    imgUrl:'/static/pages/pDiwali.png'
    }]
const tPA=[{
    id:1,
    url:'/audio?trending=true&limit=100&eye=-8019&showRelated=false&mark=3&trackId=0',
    imgUrl:'/static/pages/pTrending50.png'
    },{
    id:2,
    url:'/audio?latest=true&limit=100&eye=-8019&showRelated=false&mark=4&trackId=0 ',
    imgUrl:'/static/pages/pLatest.png'
    }]
const lPA=[{
    id:1,
    url:'/audio?trending=true&limit=100&eye=-8019&showRelated=false&mark=3&trackId=0',
    imgUrl:'/static/pages/pHanuman.png'
    },{
    id:2,
    url:'/audio?latest=true&limit=100&eye=-8019&showRelated=false&mark=4&trackId=0',
    imgUrl:'/static/pages/pRam.png'
    },{
    id:3,
    url:'/audio?latest=true&limit=100&eye=-8019&showRelated=false&mark=4&trackId=0',
    imgUrl:'/static/pages/pKrishna.png'
    }]

    // latest,limit,eye,about,showRelated,mark,trackId,
  return (
    <motion.div 

        className='p-4 sm:p-10 pb-0 overflow-auto custom_scrollbar'
    >
        <p className='hidden sm:block text-4xl font-semibold text-amber-500'>Bhajans for</p>
        <div className='my-2 sm:my-12 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-8'>
            {lPA.map((item,key)=>{
                return(
                    <Link key={key}
                        href={item.url}
                        passHref={true}
                        scroll={false}
                    >
                        <motion.a 
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            variants={pTransition}
                            onClick={()=>{setShowPlaylist(false)}}
                            className="hover:shadow-lg relative rounded overflow-hidden w-full">
                            <Image 
                                className='relative'
                                layout='responsive'
                                height={1}
                                width={1}
                                src={item.imgUrl}
                                alt={key}
                            />
                        </motion.a>
                    </Link>
                )
            })}
        </div>
        <p className='hidden sm:block text-4xl font-semibold text-amber-500'>Perfect For Festivals</p>
        <div className='my-4 sm:my-12 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-8'>
            {fPA.map((item,key)=>{
                return(
                    <Link key={key}
                        scroll={false}
                        href={item.url}
                        passHref={true}
                    >
                        <motion.a 
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            variants={pTransition}
                            onClick={()=>{setShowPlaylist(false)}}
                            className="hover:shadow-lg relative rounded overflow-hidden w-full">
                            <Image 
                                className='relative'
                                layout='responsive'
                                height={1}
                                width={1}
                                src={item.imgUrl}
                                alt={key}
                            />
                        </motion.a>
                    </Link>
                )
            })}
        </div>
        <p className='hidden sm:block text-4xl font-semibold text-amber-500'>Top Picks</p>
        <div className='mb-4 sm:my-12 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-8'>
            {tPA.map((item,key)=>{
                return(
                    <Link key={key}
                        href={item.url}
                        passHref={true}
                        scroll={false}
                    >
                        <motion.a 
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            variants={pTransition}
                            onClick={()=>{setShowPlaylist(false)}}
                            className="hover:shadow-lg relative rounded overflow-hidden w-full">
                            <Image 
                                className='relative'
                                layout='responsive'
                                height={1}
                                width={1}
                                src={item.imgUrl}
                                alt={key}
                            />
                        </motion.a>
                    </Link>
                )
            })}
        </div>

    </motion.div>
  )
}

PlayList.Layout=ActiveMusic

export default PlayList