import { getSession,useSession } from 'next-auth/react';
import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import CreateNewBlog from "../../components/utils/createNewBlog"
import _ from "lodash"
import { defaultOptions } from '../../globalSetups/availableArrays';
import {getBlogs} from "../../globalSetups/api"
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import {availableTravelBlogType} from "../../globalSetups/availableArrays"

const Blog = ({user}) => {

  const {data:session,status}=useSession()
  const {data:blogs,error:blogsError}=useSWR("FetchBlogsForUser",()=>getBlogs({id:user.id}))
  if(blogsError){
      return(
          <p>error open dev tools {blogsError}</p>
      )
  }
  if(!blogs){
      return(
          <h1>error</h1>
      )
  }

  return <div>
      <h1 className="text-2xl">Write Blogs</h1>
      <CreateNewBlog session={session}/>
      <div className='flex flex-wrap mt-20'>{
        blogs.map((blog,key)=>{
            return(
                <Link
                 href="/blogs"
                 key={key}
                >
                        <a
                            style={{backgroundSize:"contain",boxShadow:"1px 1px 10px rgba(0, 0, 0, 0.164)"}}
                            className="border-2 overflow-hidden h-32 rounded-xl cursor-pointer flex py-4 px-8 items-center border-amber-500"
                        >
                            <div className='rounded'>
                                <Image
                                  alt="Image"
                                  src={"/static/"+availableTravelBlogType[parseInt(blog.tourismType)].icon}
                                  height="80"
                                  width="80"
                                />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs">{blog.location}</p>
                                <p>{blog.heading}</p>
                            </div>
                        </a>
                </Link>
            )
        })  
      }</div>
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
