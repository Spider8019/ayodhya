import { getSession,useSession } from 'next-auth/react';
import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import CreateNewBlog from "../../components/utils/createNewBlog"
import styles from "../../styles/pages/Home.module.css"
import _ from "lodash"
import { defaultOptions } from '../../globalSetups/availableArrays';
import {getBlogs} from "../../globalSetups/api"
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';
import {useRouter} from "next/router"
import Image from 'next/image';
import {IconButton} from "@mui/material"
import {availableTravelBlogType} from "../../globalSetups/availableArrays"
import LanguageIcon from '@mui/icons-material/Language';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

const Blog = ({user}) => {

  const router=useRouter()
  const {data:session,status}=useSession()
  const {data:blogs,error:blogsError}=useSWR("FetchBlogsForUser",()=>getBlogs({id:user.id}))
  if(blogsError){
      return(
          <p>error open dev tools {blogsError}</p>
      )
  }
  if(!blogs){
      return(
          <h1>loading</h1>
      )
  }

  return <div className='min-h-screen'>
      <Head>
          <title>Blog - Ikshvaku</title>
      </Head>
      <h1 className="text-2xl">Write Blogs</h1>
      <CreateNewBlog session={session}/>
      <div className='flex flex-wrap mt-8'>
        {blogs.map((blog,key)=>{
            return(
                    <div
                        key={key}
                        style={{backgroundSize:"contain",boxShadow:"1px 1px 10px rgba(0, 0, 0, 0.164)"}}
                        className={`${styles.blogRel} relative mr-4 border-2 w-full sm:w-fit overflow-hidden h-32 rounded-xl cursor-pointer flex py-4 px-8 items-center border-amber-500`}
                    > 
                        <div className={` ${styles.blogAbs} absolute top-0 left-0 right-0 bottom-0 z-20 grid place-items-center`}  >
                            <div className="flex justify-between">
                                <IconButton 
                                    onClick={()=>window.open(`/tourism/${blog._id}`)}
                                    className=""><LanguageIcon /></IconButton>
                                <IconButton
                                    onClick={()=>router.push(`/dashboard/${blog._id}/editBlog`)}
                                    className=""><EditLocationAltIcon/></IconButton>
                            </div>
                        </div>
                        <div className='rounded'>
                                <Image
                                    alt="Image"
                                    src={blog.tourismType!=="-1"?"/static/"+availableTravelBlogType[parseInt(blog.tourismType)].icon:"/static/withOutBgLogo.png"}
                                    height="80"
                                    width="80"
                                />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs">{blog.location}</p>
                            <p>{blog.heading}</p>
                        </div>
                    </div>)
        })}
    </div>
  </div>;
};

Blog.Layout = DashboardLayout

export async function  getServerSideProps(context){

    const session = await getSession(context)
    if(_.isNull(session)){
         return {
             redirect:{
                 destination:`${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard/blog`,
                 permanent:false
             }
         }
    }
    return {
        props:{
            user:session.user
        }
    }
 }
 
export default Blog;
