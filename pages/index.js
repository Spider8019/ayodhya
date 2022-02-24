import { useEffect, useRef,useState } from "react"
import {isMobile,BrowserView,MobileView} from "react-device-detect"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import styles from "../styles/pages/Home.module.css"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import { siedEntrance } from "../globalSetups/framer"
import { useInView } from 'react-intersection-observer';
import _ from "lodash"
import { getEvent } from "../globalSetups/api"
import Ad from "../components/adSense/ad1"

export default function Home() {

  const { scrollY, scrollYProgress } = useViewportScroll()

  const yearsFrom5Aug = useTransform(scrollY, [2200, 3000], [0.2, 1]);
  const yearsFromKarsevak = useTransform(scrollY, [1800, 2200], [0.2, 1]);
  const yearsFromBabarInvade = useTransform(scrollY, [1400, 1800], [0.2, 1]);
  const yearsFrom1400 = useTransform(scrollY, [1000, 1400], [0.2, 1]);


  // const d = useRef(new Date())
  // d.current.setDate(1)
  const [d,setD]=useState(new Date())
  const [todaysEvent,setTodaysEvent]=useState({})


  const { ref: heroSec, inView } = useInView({ threshold: 0.5 });
  const { ref: heroTalent, inView: heroTalentInView } = useInView({ threshold: 0.5 });

  let { t } = useTranslation()
  const router = useRouter()


  useEffect(()=>{
    (async()=>{
      const response=await getEvent({ date: d.getDate() })
      setTodaysEvent(response)
    })()
  },[d])
  
  return (
    <>
      <Head>
        <title>{t('common:title')}</title>
        <meta name='description' content='www.ikshvaku.club is designed by spider8019 to promote tourism in the city of Lord Rama, Ayodhya (Faizabad) Uttar Pradesh. It also allows you to find the city&apos;s most skilled people in categories like arts, music, dancing, photography, and many more.' />
        <link rel="icon" href="/static/withOutBgLogo.png" />
      </Head>


      <motion.div
        style={{width: "100%", height: isMobile?"80vh":"calc(100vh - 10rem)", position: "relative" }}
        className="grid place-items-center" >
        <Image
          layout="fill"
          src="/static/hero.jpg"
          alt="Heading"
          objectFit="cover"
          priority={true}
        />
        <motion.div
          className={`absolute top-auto left-2/4 sm:left-1/4 p-5 rounded ${styles.heroChildDiv}`}
        >
          <motion.h1 className="text-white text-4xl sm:text-2xl sm:uppercase font-semibold">The New <br /> Ayodhya</motion.h1>
          <motion.p className="text-white text-xl sm:text-xs mt-2">PEERLESS REFINEMENT AND LUXURY</motion.p>
          <button
            className="mt-2 basicButton"
            onClick={() => router.push("/gallery")}
          >VIEW GALLERY </button>
        </motion.div>
      </motion.div>

      <ins className="adsbygoogle"
          style="display:block"
          data-ad-format="fluid"
          data-ad-layout-key="-6p+dg+58-2b-89"
          data-ad-client="ca-pub-5871634443514718"
          data-ad-slot="1580184139"></ins>
      <motion.div
        className={`grid ${styles.aug5ParentContainer}`}
        ref={heroSec}
      >
        <motion.div className={`${styles.aug5Text} grid place-items-center `}>
          <motion.div className="my-20 sm:my-0 w-2/4">
            <p className="text-center leading-8">On August 5 of 2022, Prime Minister Narendra Modi attended Ram Mandir&apos;s bhoomi pujan in Ayodhya.</p>
          </motion.div>
        </motion.div>
        <motion.div className="grid items-center">
          <motion.div className={`${styles.aug5container} lgBg`}>
            <MobileView className="mb-20">
              <Image 
                src="/static/withOutBgLogo.png"
                height={200}
                width={200}
                alt="Ikshvaku Spider8019 Logo"
              />
            </MobileView>
            <motion.p
              initial="initial"
              exit="initial"
              animate={inView && "final"}
              variants={{ ...siedEntrance, final: { ...siedEntrance.final, transition: { duration: 0.5, delay: 0.5 } } }}
              className={`${styles.overlayingText} text-amber-500 text-4xl sm:text-8xl font-semibold`}>5<sup>th</sup> August</motion.p>
            <motion.p
              initial="initial"
              exit="initial"
              animate={inView && "final"}
              variants={siedEntrance}
              className={`${styles.baseText} GFG  uppercase `}>ayodhya</motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
<Ad/>

google ad sense
      <Ad/>

      <motion.div className={styles.timelineContainerAnimate}>
        <motion.div className={styles.timelineContainer}>
          <div className="absolute left-2/4 top-0 -translate-x-2/4">
            <BrowserView>
                <h1 className="text-2xl">Finally good time comes</h1>
            </BrowserView>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-20 mx-8 sm:mx-20">
              <motion.div
                whileHover={
                  {
                    scale: 1.05,
                    rotate: [0, -5, 5, 0]
                  }
                }
                className="h-80 grid grid-cols-1 grid-rows-2 rounded overflow-hidden"
                style={{ opacity: isMobile?1:yearsFrom5Aug, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ position:"Relative",width: "100%", height: "160px" }}>
                  <Image
                    layout="fill"
                    objectFit='cover'
                    src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202102/ram_temple_1_1200x768.jpeg?beWwolAYI9RjhIeuQv85qWoj6Gd_fYQW&size=770:433"
                    alt="5 August 2020"
                  />
                </div>
                <div className=" p-4 flex flex-col">
                  <p className="mb-4">{t('common:home.timeline.d.title')}</p>
                  <p className="text-sm overflow-hidden"
                  >{t('common:home.timeline.d.body')}</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={
                  {
                    scale: 1.05,
                    rotate: [0, -5, 5, 0]
                  }
                }
                className="h-80 grid grid-cols-1 grid-rows-2 rounded overflow-hidden"
                style={{ opacity: isMobile?1:yearsFromKarsevak, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ position:"relative",width:"100%",height:"160px" }}>
                  <Image
                    layout="fill"
                    objectFit='cover'
                    src="https://gumlet.assettype.com/swarajya%2F2017-04%2F58ad8b07-27c7-40d9-a5d3-4c53abac41b4%2Fbabri.jpg?rect=0%2C0%2C636%2C358&q=75&auto=format%2Ccompress&w=1200"
                    alt="5 August 2020"
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <p className="mb-4">{t('common:home.timeline.c.title')}</p>
                  <p className="text-sm overflow-hidden"
                  >{t('common:home.timeline.c.body')}</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={
                  {
                    scale: 1.05,
                    rotate: [0, -5, 5, 0]
                  }
                }
                className="h-80 grid grid-cols-1 grid-rows-2 rounded overflow-hidden"
                style={{ opacity: isMobile?1:yearsFromBabarInvade, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{position:"relative", width: "100%", height: "160px" }}>
                  <Image
                    layout="fill"
                    objectFit='cover'
                    src="https://thetalentedworld.net/wp-content/uploads/2021/07/Zaheeruddin-Babar.jpg"
                    alt="5 August 2020"
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <p className="mb-4">{t('common:home.timeline.b.title')}</p>
                  <p className="text-sm overflow-hidden"
                  >{t('common:home.timeline.b.body')}</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={
                  {
                    scale: 1.05,
                    rotate: [0, -5, 5, 0]
                  }
                }
                className="h-80 grid grid-cols-1 grid-rows-2 rounded overflow-hidden"
                style={{ opacity: isMobile?1:yearsFrom1400, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ position:"relative",width: "100%", height: "160px" }}>
                  <Image
                    layout="fill"
                    objectFit='cover'
                    src="https://images.sadhguru.org/sites/default/files/styles/wisdom_grid_image_style/public/media_files/Kaliyuga.jpg"
                    alt="5 August 2020"
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <p className="mb-4">{t('common:home.timeline.a.title')}</p>
                  <p className="text-sm overflow-hidden"
                  >{t('common:home.timeline.a.body')}</p>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </motion.div>

      <motion.div
        ref={heroTalent}
        className={`${styles.talentsContainer}`}>
        <motion.div className={`${styles.talentsHeading}`}>
          <motion.h1
            initial="initial"
            exit="initial"
            animate={heroTalentInView && "final"}
            variants={siedEntrance}
            className="text-5xl sm:text-8xl font-semibold">Talent&apos;s</motion.h1>
        </motion.div>
        <motion.div
          className="grid place-items-center">
          <div className="grid place-items-center">
            <Image 
               src="/static/pages/talentHome.png"
               alt="Talent page"
               height="150"
               width="500"
               objectFit="contain"
               className="m-12 block rounded-full"
            />
            <h1>
              <span className="block text-xl text-center">Don&apos;t Waste Your Talent explores this journey</span>
              Modernize, streamline, and expedite your talent communication.
            </h1>
            <Link href="/talent">
              <a className="mt-4 block basicDarkButton">Explore Talents from Ayodhya</a>
            </Link>
          </div>
        </motion.div>
        <div></div>
      </motion.div>


      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="grid place-items-center text-center"
        >{
          !_.isEmpty(todaysEvent)
          &&
          <div 
            className="calendarLeftContainer"
          >
            <div 
            >
              <Image src={todaysEvent.imgUrl}
                alt="Todays Event Image Url"
                className="rounded-full"
                width={isMobile?200:300}
                height={isMobile?200:300}
                objectFit="cover"
              />
            </div>
            <div className="px-8 sm:px-20 my-8 z-30">
              <p className="text-3xl font-semibold ">{todaysEvent.heading}</p>
              <p className="mt-8">{todaysEvent.about}</p>
            </div>
          </div>
        }
        </div>
        <div className="grid place-items-center sm:mb-0 mb-20">
          <div className="grid grid-cols-7 p-4 sm:p-0 w-full sm:w-2/3 items-center">
            {_.concat(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],new Array(new Date(d.getFullYear(),d.getMonth(),1).getDay()-1).fill(""), new Array(new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()).fill("")).map((item, key) => {
              return (
                key > 6 && key < 6 + new Date(d.getFullYear(),d.getMonth(),1).getDay()
                  ?
                  <p key={key}></p>
                  :
                  <div key={key}
                    value={key}
                    onClick={()=>{key<=6?console.log("You can't select month"):setD(new Date(new Date().getFullYear(),new Date().getMonth(),key-(new Date(d.getFullYear(),d.getMonth(),1).getDay())-5))}}
                    style={{ 
                             cursor:key<=6?"no-drop":"pointer",
                             background: key - 5 - new Date(d.getFullYear(),d.getMonth(),1).getDay() === d.getDate() ? "#ffd793" :key - 5 - new Date(d.getFullYear(),d.getMonth(),1).getDay() === new Date().getDate()?"#f59e0b": "#eee", 
                             color: key - 5 - new Date(d.getFullYear(),d.getMonth(),1).getDay() === new Date().getDate() ? "white" : key - 5 - new Date(d.getFullYear(),d.getMonth(),1).getDay()  === d.getDate()?"red": "black" }}
                    className="cursor-pointer rounded self-center grid place-items-center text-sm m-1 p-2 sm:p-4 ">
                    <p className="">{(key >= (6 + new Date(d.getFullYear(),d.getMonth(),1).getDay())) ? key - 5 - new Date(d.getFullYear(),d.getMonth(),1).getDay() : <span className="font-semibold">{item}</span>}</p>
                  </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      <style global jsx>{`
        .calendarLeftContainer {
          background:url("/static/pages/calendar.png");
          background-size:contain;
          background-position:left;
          background-repeat:no-repeat;
        }
      `}</style>
    </>
  )
}





