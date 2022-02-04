import { getSession,useSession } from 'next-auth/react';
import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import CreateNewBlog from "../../components/utils/createNewBlog"
import _ from "lodash"
import { defaultOptions } from '../../globalSetups/availableArrays';


const Blog = () => {

  const {data:session,status}=useSession()

  return <div>
      <h1 className="text-2xl">Write Blogs</h1>
      <CreateNewBlog session={session}/>
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
            
        }
    }
 }
 
export default Blog;
