import React,{useState,useRef} from 'react'
import DashboardLayout from "../../components/layout/dashboardLayout"
import { postEvent } from '../../globalSetups/api'
import Head from 'next/head'
import { notifyerror, notifysuccess, notifywarn } from '../../components/snackbar'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import _ from "lodash"
import {profileById} from "../../globalSetups/api"
import { defaultOptions } from '../../globalSetups/availableArrays'

const AddEvent = () => {

  const d=new Date()
  const [event,setEvent]=useState({
      heading:"",
      about:"",
      imgUrl:"",
      date:1
  })

  const handleSubmit = async() =>{
    const response=await postEvent(event)
    if(response.status===200){
        notifysuccess("The event has been successfully added.")
        setEvent({heading:"",about:"",imgUrl:"",date:""})
    }
    else{
        console.log(response)
        notifywarn("Something didn't work out. To see it, open devtools.")
    }
  }

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(str);
  }

  return (
    <div className='p-4'>
        <Head>
            <title>
                Add Event - Ikshvaku
            </title>
        </Head>
        <p className='text-2xl mb-8'>Add Event</p>
        <div className='grid grid-cols-2 gap-8'>
            <div>
                <input type="text"
                    className='w-full my-4 p-4 bg-slate-100'
                    value={event.heading}
                    onChange={e=>setEvent({...event,heading:e.target.value})}
                    placeholder='Heading'
                />
                <input type="text"
                    placeholder='Body'
                    value={event.about}
                    onChange={e=>setEvent({...event,about:e.target.value})}
                    className='w-full my-4 p-4 bg-slate-100'
                />
                <input type="url"
                    pattern="https://.*"
                    placeholder='Image Url (Copy URL from UNSPLASH.COM)'
                    value={event.imgUrl}
                    onChange={e=>setEvent({...event,imgUrl:e.target.value})}
                    className='w-full my-4 p-4 bg-slate-100'
                />    
                <select 
                    onChange={e=>setEvent({...event,date:e.target.value})}
                    className='block w-full my-4 p-4 bg-slate-100'>
                    {new Array(new Date(d.getFullYear(),d.getMonth()+1,0).getDate()).fill("").map((item,key)=>{
                        return <option key={key}
                            value={key+1} 
                            selected
                        >
                            {key+1}
                        </option>
                    })}
                </select>

                <button   
                    onClick={handleSubmit}   
                    className='my-4 basicDarkButton'
                >
                    Add Event
                </button>
            </div>
            <div className="border m-4 border-black rounded relative">
                <Image
                    src={validURL(event.imgUrl)?event.imgUrl:"/static/Preview.png"}
                    alt="Image Preview"
                    className='rounded'
                    objectFit='cover'
                    layout="fill"
                />
            </div>
        </div>
    </div>
  )
}

AddEvent.Layout=DashboardLayout

export default AddEvent

export async function getServerSideProps(context){
    const session=await getSession(context)
    if(_.isNull(session)){
        return {
            redirect:{
                destination:`${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard`,
                permanent:false
            }
        }
    }

    const getProfile=await profileById({id:session.user.id})
    if(!getProfile.isDeveloper){
        return {
            redirect:{
                destination:`${defaultOptions.baseUrl}/dashboard?msg=0`,
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
