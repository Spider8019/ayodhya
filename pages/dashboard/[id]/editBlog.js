import { getSession,useSession } from 'next-auth/react';
import React,{useState} from 'react';
import DashboardLayout from "../../../components/layout/dashboardLayout"
import { defaultOptions } from '../../../globalSetups/availableArrays';
import {getSpecificBlog,editBlog} from "../../../globalSetups/api";
import _ from "lodash";
import {useRouter} from "next/router"
import Image from 'next/image';
import { nanoid } from 'nanoid';
import {availableTravelBlogType} from "../../../globalSetups/availableArrays"
import axios from "axios"
import TextEditor from "../../../components/utils/TextEditor"
import { deleteObject,uploadObject } from '../../../globalSetups/aws/s3';

const EBlog = ({detail,about}) => {
  const router=useRouter()
  const [det,setDetail]=useState({...detail})
  const [ab,setAbout]=useState(about)
//   console.log(detail,about)

  const EdBlog=async()=>{
    await deleteObject({url:detail.about},(async(errDlt,dataDlt)=>{
        // console.log(errDlt,dataDlt)
        if(_.isEmpty(dataDlt)){
            await uploadObject({file:ab,filename:"spider8019_blog"+nanoid(4)},async(err,data)=>{
                if(_.isNull(err)){
                    const payload={
                      id:det._id,
                      heading:det.heading,
                      about:data.url,
                      tourismType:det.tourismType,
                      location:det.location,
                    }
                    const response = await editBlog(payload)
                    alert("Updated Successfully",response.data)
                    window.location.reload()
                  }
              })
        }
        else{
          alert(errDlt)
        }
      }))
  }

  return <div className='min-h-screen'>
      <h1 className="text-2xl">Edit Blogs</h1>
      <div className='rounded mt-12 p-4 bg-gray-200'>
        <div className='grid grid-cols-3 gap-4 mb-4'>
            <input 
                type="text"
                className="rounded"
                value={det.heading}
                placeholder="Heading"
                onChange={e=>setDetail({...det,heading:e.target.value})}
            />
            <input 
                type="text"
                className="rounded"
                value={det.location}
                placeholder="Location"
                onChange={e=>setDetail({...det,location:e.target.value})}
            />
            <select className='rounded'
             value={parseInt(det.tourismType)}
             onChange={e=>setDetail({...det,tourismType:e.target.value})}
            >
                {availableTravelBlogType.map((item,key)=>{
                    return(
                        <option value={key}
                            key={key}
                        >{item.name}</option>
                    )
                })}
            </select>
        </div>
        <TextEditor content={ab} setContent={setAbout}/>
        <button onClick={EdBlog} className='basicDarkButton mt-4 w-full'>Done</button>
      </div>
  </div>;
};

EBlog.Layout = DashboardLayout

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
    const {params} = context;
    const data = (await getSpecificBlog({tourId:params.id})).data
    const about = (await axios.get(`${data.about}`)).data

    return {
        props:{
            user:session.user,
            detail:data,
            about:JSON.stringify(about)
        }
    }
 }
 
export default EBlog;
