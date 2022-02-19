import { useEffect, useRef,useState } from "react"
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
import useSWR, { mutate } from "swr"
import axios from "axios"

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

  useEffect(() => {
    document.querySelector("body").style.fontFamily = router.locale === "hn" ? "Noto Sans Devanagari" : "Noto Sans Display";
  }, [])
  useEffect(()=>{
    (async()=>{
      const response=await getEvent({ date: d.getDate() })
      setTodaysEvent(response)
    })()
  },[d])
  console.log(d.getDate())
  
  return (
    <>
      <Head>
        <title>{t('common:title')}</title>
        <meta name='description' content='www.ikshvaku.club is designed by spider8019 to promote tourism in the city of Lord Rama, Ayodhya (Faizabad) Uttar Pradesh. It also allows you to find the city&apos;s most skilled people in categories like arts, music, dancing, photography, and many more.' />
        <link rel="icon" href="/static/withOutBgLogo.png" />
      </Head>


      <motion.div
        style={{ width: "100%", height: "calc(100vh - 10rem)", position: "relative" }}
        className="grid place-items-center" >
        <Image
          layout="fill"
          src="/static/hero.jpg"
          alt="Heading"
          objectFit="cover"
          priority={true}
        />
        <motion.div
          className="absolute top-auto left-1/4 -translate-x-100 p-5 rounded"
          style={{ background: "rgba(245,158,11,0.7)", transform: "translateX(-100%)" }}>
          <motion.h1 className="text-white text-2xl font-semibold">THE NEW <br /> AYODHYA</motion.h1>
          <motion.p className="text-white text-xs mt-2">PEERLESS REFINEMENT AND LUXURY</motion.p>
          <button
            className="mt-2 basicButton"
            onClick={() => router.push("/gallery")}
          >VIEW GALLERY </button>
        </motion.div>
        {/* <p>{t('common:home.body')}</p> */}
      </motion.div>
      <motion.div
        className="grid"
        ref={heroSec}
        style={{ gridTemplateColumns: "0.4fr 0.8fr" }}
      >
        <motion.div className={`${styles.aug5Text} grid place-items-center `}>
          <motion.div className="w-2/4">
            <p className="text-center leading-8">On August 5 of 2022, Prime Minister Narendra Modi attended Ram Mandir&apos;s bhoomi pujan in Ayodhya.</p>
          </motion.div>
        </motion.div>
        <motion.div className="grid items-center">
          <motion.div className={`${styles.aug5container} lgBg`}>
            <motion.p
              initial="initial"
              exit="initial"
              animate={inView && "final"}
              variants={{ ...siedEntrance, final: { ...siedEntrance.final, transition: { duration: 0.5, delay: 0.5 } } }}
              className={`${styles.overlayingText} text-amber-500  text-8xl font-semibold`}>5<sup>th</sup> August</motion.p>
            <motion.p
              initial="initial"
              exit="initial"
              animate={inView && "final"}
              variants={siedEntrance}
              className={`${styles.baseText} GFG  uppercase `}>ayodhya</motion.p>
          </motion.div>
        </motion.div>
      </motion.div>


      <motion.div className={styles.timelineContainerAnimate}>
        <motion.div className={styles.timelineContainer}>
          <div className="absolute left-2/4 top-0 -translate-x-2/4">
            <h1 className="text-2xl">Finally good time comes</h1>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-20 mx-20">
              <motion.div
                whileHover={
                  {
                    scale: 1.05,
                    rotate: [0, -5, 5, 0]
                  }
                }
                className="h-80 grid grid-cols-1 grid-rows-2 rounded overflow-hidden"
                style={{ opacity: yearsFrom5Aug, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ width: "100%", height: "160px" }}>
                  <Image
                    layout="responsive"
                    height={100}
                    width={160}
                    objectFit='cover'
                    src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202102/ram_temple_1_1200x768.jpeg?beWwolAYI9RjhIeuQv85qWoj6Gd_fYQW&size=770:433"
                    alt="5 August 2020"
                  />
                </div>
                <div className=" p-4 flex flex-col">
                  <p className="mb-4">Shri Ram Mandir Ayodhya</p>
                  <p className="text-sm overflow-hidden"
                  >The temple construction is being supervised by the Shri Ram Janmabhoomi Teerth Kshetra. <br />Architect: Chandrakant Sompura</p>
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
                style={{ opacity: yearsFromKarsevak, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ width: "100%", height: "160px" }}>
                  <Image
                    layout="responsive"
                    height={100}
                    width={160}
                    objectFit='cover'
                    src="https://gumlet.assettype.com/swarajya%2F2017-04%2F58ad8b07-27c7-40d9-a5d3-4c53abac41b4%2Fbabri.jpg?rect=0%2C0%2C636%2C358&q=75&auto=format%2Ccompress&w=1200"
                    alt="5 August 2020"
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <p className="mb-4">Demolition of the Babri Masjid</p>
                  <p className="text-sm overflow-hidden"
                  >On Dec 6, 1992, a group of activists from the Vishva Hindu Parishad and other organisations demolished the Babri Masjid illegally.</p>
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
                style={{ opacity: yearsFromBabarInvade, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ width: "100%", height: "160px" }}>
                  <Image
                    layout="responsive"
                    height={100}
                    width={160}
                    objectFit='cover'
                    src="https://thetalentedworld.net/wp-content/uploads/2021/07/Zaheeruddin-Babar.jpg"
                    alt="5 August 2020"
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <p className="mb-4">Masjid-i Janmasthan</p>
                  <p className="text-sm overflow-hidden"
                  >It was built by Mir Baqi, possibly a bey serving under Mughal emperor Babur, in the year 935 of the Islamic calendar (Sep 1528–Sep 1529 CE).</p>
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
                style={{ opacity: yearsFrom1400, boxShadow: "2px 2px 20px #00000041" }}
              >
                <div className="bg-black" style={{ width: "100%", height: "160px" }}>
                  <Image
                    layout="responsive"
                    height={100}
                    width={160}
                    objectFit='cover'
                    src="https://images.sadhguru.org/sites/default/files/styles/wisdom_grid_image_style/public/media_files/Kaliyuga.jpg"
                    alt="5 August 2020"
                  />
                </div>
                <div className="p-4 flex flex-col">
                  <p className="mb-4">Before appraise of time</p>
                  <p className="text-sm overflow-hidden"
                  >A massive but short-lived structure of almost 50m north–south direction was built during the early mediaeval period (11–12th century CE).</p>
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
            className="text-8xl font-semibold">Talent&apos;s</motion.h1>
        </motion.div>
        <motion.div
          style={{ height: "60vh" }}
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
              <a className="mt-4 block basicDarkButton">Explore Talents from Ayodhya{new Date(d.getFullYear(),d.getMonth(),1).getDay()}</a>
            </Link>
          </div>
        </motion.div>
        <div></div>
      </motion.div>


      <motion.div
        className="grid grid-cols-2 "
        style={{ height: "100vh" }}
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
                width="300"
                height="300"
                objectFit="cover"
              />
            </div>
            <div className=" px-20 my-8 z-30">
              <p className="text-3xl font-semibold ">{todaysEvent.heading}</p>
              <p className="mt-8">{todaysEvent.about}</p>
            </div>
          </div>
        }
        </div>
        <div className="grid place-items-center">
          <div className="grid grid-cols-7 w-2/3 items-center">
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
                    className="cursor-pointer rounded self-center grid place-items-center text-sm m-1 p-4 ">
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





