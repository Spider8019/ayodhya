import React,{useState} from 'react'
import DashboardLayout from "../../components/layout/dashboardLayout"
import { postEvent } from '../../globalSetups/api'
import Head from 'next/head'
import { notifysuccess, notifywarn } from '../../components/snackbar'

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
        notifysuccess("Event add successfully")
    }
    else{
        console.log(response)
        notifywarn("Something didn't work out. To see it, open devtools.")
    }
  }
  return (
    <div className='p-4'>
        <Head>
            <title>
                Add Event - Ikshvaku
            </title>
        </Head>
        <p className='text-2xl mb-8'>Add Event</p>
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
            <input type="text"
                placeholder='Image Url'
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
  )
}

AddEvent.Layout=DashboardLayout

export default AddEvent
