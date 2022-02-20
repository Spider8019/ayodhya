import React, { useRef, useState } from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import { Chart } from "react-google-charts"
import styles from "../../styles/pages/Dashboard.module.css"
import { useSession, getSession } from 'next-auth/react';
import _ from "lodash"
import { Avatar } from '@mui/material';
import Image from 'next/image';
import useSWR from "swr";
import { getProfileDetails, getPostsOfProfile, getAudios, getBlogs } from '../../globalSetups/api';
import Head from "next/head"
import TabulateLoader from "../../components/global/TabulateLoader"
import {BrowserView,isMobile} from "react-device-detect"

const Tabulate = ({ user }) => {

  const postInsights = useRef([['Your Posts', 'Views', 'LikedBy', 'DislikedBy']])
  const songsInsights = useRef([['Your Songs', 'Views', 'LikedBy', 'DislikedBy']])
  const blogsInsights = useRef([['Your Blogs', 'Created at', 'LikedBy', 'DislikedBy']])

  const { data: session, status } = useSession()
  const [showGraph, setShowGraph] = useState(0)
  const { data: profile, error } = useSWR("GetBasicDetail", () => getProfileDetails({ email: user && user.email }))
  const { data: posts, error: postsError } = useSWR("GetPostsOfAuthenticatedPerson", () => getPostsOfProfile({ createdBy: user.id }), { revalidateOnFocus: false })
  const { data: postsSong, error: songsError } = useSWR("GetAudiosForAuthenticated", () => getAudios({ id: user.id }), { revalidateOnFocus: false })
  const { data: blogs, error: blogsError } = useSWR("FetchBlogsForUser", () => getBlogs({ id: user.id }))


  if (error || postsError || songsError || blogsError)
    return <h1>Error for {user.id}{console.log(songsError)}{console.log(postsError)}</h1>
  if (  !profile || !posts || !postsSong || !blogs) {
    return <TabulateLoader/>
  }

  if (postInsights.current.length === 1 && songsInsights.current.length === 1 && blogsInsights.current.length === 1) {
    postInsights.current = _.concat(postInsights.current, posts.data.map((item, key) => { return [item._id, item.view, item.likedBy.length, item.dislikedBy.length] }))
    songsInsights.current = _.concat(songsInsights.current, postsSong.map((item, key) => { return [item.about.split("****")[0], item.view, item.likedBy.length, item.dislikedBy.length] }))
    blogsInsights.current = _.concat(blogsInsights.current, blogs.map((item, key) => { return [item.heading, item.createdAt, item.likedBy.length, item.dislikedBy.length] }))
  }

  const options = {
    chart: {
      title: showGraph === 0 ? "Your Posts Insights" : showGraph === 1 ? "Your Songs Insights" : "Your Blogs Insights",
      subtitle: "day wise"
    },
  };

  return (
    <div className='grid' style={{ height: "calc(100vh - 2rem)", gridTemplateRows: "auto 1fr auto" }}>
      <Head>
        <title>Tabulate - Ikshvaku</title>
      </Head>

      <div className="flex justify-between">
        <p className='text-2xl'>Tabulate</p>
        <div className='flex items-center'>
          <Avatar
            src={user.image}
            alt={user.name}
          />
          <p className='mx-4'>{session && session.user.name}</p>
        </div>
      </div>
      <div
        className='grid my-12 items-center '
        style={{ gridTemplateColumns: isMobile?"1fr":"auto 250px" }}
      >
        <div className="w-full">
          <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={showGraph === 0 ? postInsights.current : showGraph === 1 ? songsInsights.current : blogsInsights.current}
            options={options}
          />
          <div>
          </div>
        </div>
        <BrowserView>
            <div className={`pt-4 self-stretch rounded-2xl ml-4 ${styles.badgesContainer}`}>
              <p className='text-center'>Your Unlocks</p>
              <div>
                <div className={`p-2 rounded bg-white m-4 ${styles.badge}`}>
                  Artist
                </div>
              </div>
            </div>
        </BrowserView>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ src: "/static/pages/tabulate1.png" }, { src: "/static/pages/tabulate2.png" }, { src: "/static/pages/tabulate3.png" }].map((item, key) => {
          return (
            <div
              key={key}
              style={{ backgroundSize: "contain", boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.164)" }}
              className={`${key === showGraph && ' border-amber-400'} relative border-2 overflow-hidden h-32 rounded-xl grid place-items-center cursor-pointer`}
              onClick={() => setShowGraph(key)}
            >
              {
                key === showGraph
                &&
                <>
                  <div className='absolute top-4 left-4 w-2 h-2 rounded-full bg-amber-500'>
                  </div>
                  <div className='absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-500'>
                  </div>
                  <div className='absolute bottom-4 left-4 w-2 h-2 rounded-full bg-amber-500'>
                  </div>
                  <div className='absolute bottom-4 right-4 w-2 h-2 rounded-full bg-amber-500'>
                  </div>
                </>
              }
              <Image
                layout="intrinsic"
                height={150}
                width={150}
                src={item.src}
                alt={key}
              />
            </div>
          )
        })}
      </div>

    </div>

  )

};

Tabulate.Layout = DashboardLayout

export default Tabulate;

export async function getServerSideProps(context) {

  const session = await getSession(context)
  if (_.isNull(session)) {
    return {
      redirect: {
        destination: `${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard/tabulate`,
        permanent: false
      }
    }
  }

  return {
    props: {
      user: session.user
    }
  }
}

