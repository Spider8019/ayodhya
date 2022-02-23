import React,{useState,useEffect} from 'react'

const Youtube = () => {
  const [blob,setBlog]=useState("blob:https://www.youtube.com/2ac3e3ae-fdca-4b39-8b70-79cdfc82e5a5")
  const [url,setUrl]=useState("")
  useEffect(()=>{
    const reader=new FileReader()
    reader.addEventListener('loadend',()=>{
        console.log(reader.result)
    })
    reader.readAsDataURL(blob)
  },[blob])
  return (
      <>
        <div>Youtube</div>
        <video width="400" controls>
            <source src={url} type="video/mp4"/>
            Your browser does not support HTML video.
        </video>    
      </>
  )
}

export default Youtube