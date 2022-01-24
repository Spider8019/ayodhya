import {useEffect} from "react"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
import { opacity } from "../globalSetups/framer"
import Navbar from '../components/global/Navbar'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

export default function Home() {

  let  { t }= useTranslation()
  const router=useRouter()

  useEffect(()=>{
    document.querySelector("body").style.fontFamily=router.locale==="hn"?"Noto Sans Devanagari":"Noto Sans Display";
  })

  return (
    <>
      <Head>
        <title>{t('common:title')}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid place-items-center">
         <div className="grid place-items-center" style={{width: "100%",height: "calc(100vh - 10rem)",position: "relative"}}>
           <Image
             layout="fill"
             src="/static/hero.jpg"
             alt="Heading"
             objectFit="cover"
             priority={true}
            />
            <motion.div
              initial="initial"
              exit="initial"
              animate="final"
              variants={opacity}
              className="absolute top-auto left-1/4 -translate-x-100 p-5 rounded" 
              style={{background:"rgba(245,158,11,0.7)",transform:"translateX(-100%)"}}>
              <h1 className="text-white text-2xl font-semibold">THE NEW <br/> AYODHYA</h1>
              <p className="text-white text-xs mt-2">PEERLESS REFINEMENT AND LUXURY</p>
              <button 
                className="mt-2 basicButton"
                onClick={()=>router.push("/gallery")}
              >VIEW GALLERY </button>
            </motion.div>
           {/* <p>{t('common:home.body')}</p> */}
         </div>
      </div>
      <h1 className="m-10 bg-gray-500">aman pratap singh</h1>
            <iframe src="https://drive.google.com/file/d/1g2jdkNXgQgvnZVIr6bzZeMLBdNeFHv3B/preview" width="640" height="480" allow="autoplay"></iframe>
           <h1 className="text-3xl mb-10">{t('common:home.title')}</h1>
      <h1>{t('common:ayodhya')}</h1>
    </>
  )
}


