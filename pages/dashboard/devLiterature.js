import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import parse from 'html-react-parser';
import {Select,Avatar} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { getSession, useSession } from 'next-auth/react';
import { getUniqueBooks, deleteLiteratureSpecific,postLiteratureMaterial,getChaptersForABook,getContextForASpecificLiterature,getLiteratureSideBar} from '../../globalSetups/api';
import { uploadObject,deleteObject } from '../../globalSetups/aws/s3';
import { nanoid } from 'nanoid';
import _ from "lodash"
import axios from 'axios';
import "suneditor/dist/css/suneditor.min.css";


const DevLiterature = ({uniqueBooks}) => {

  const [selectedBook,setSelectedBook]=React.useState("addNew")
  const [newBook,setNewBook]=React.useState("")
  const [selectedChapter,setSelectedChapter]=React.useState("addNew")
  const [newChapter,setNewChapter]=React.useState("")
  const [content,setContent]=React.useState("")
  const [contentFlag,setContentFlag]=React.useState("")
  const [availableChapter,setAvailableChapters]=React.useState([])
  const idOfExistingLiterature=React.useRef("")
  const {data:session,status}=useSession()

  const onChangeBook=async (e)=>{
    setSelectedBook(e.target.value)
    setContentFlag("")
    if(e.target.value!=="addNew")
    {
     const getChapters=await getChaptersForABook({book:e.target.value})
     setAvailableChapters(getChapters.data)
    }
  }
  const onChangeChapter = async(e)=>{
    setSelectedChapter(e.target.value)
    setContent("")
    setContentFlag("")
    if(!["addNew"].includes(e.target.value))
    {
     const getContext=await getContextForASpecificLiterature({book:selectedBook,chapter:e.target.value})
     idOfExistingLiterature.current=getContext.data._id
     const contextData=(await axios.get(getContext.data.aboutUrl))
     if(contextData.status===200)
     {
       setContentFlag(getContext.data.aboutUrl)
       setContent(contextData.data)  
     }
    }
  }
  const handleSubmitLiterature=async()=>{
    console.log(contentFlag)
    if(contentFlag.length!==0)
      {
        alert(contentFlag)
        await deleteObject({url:contentFlag},(async(errDlt,dataDlt)=>{
          console.log(errDlt,dataDlt)
          if(_.isEmpty(dataDlt)){
            console.log("xmmysz",idOfExistingLiterature.current)
            await deleteLiteratureSpecific({id:idOfExistingLiterature.current})
          }
          else{
            alert(errDlt)
          }
        }))
      }
  
    await uploadObject({file:content,filename:"spider8019_literature"+nanoid(4)},async(err,data)=>{
      if(_.isNull(err)){
          const payload={
            book:selectedBook==='addNew'?newBook:selectedBook,
            chapter:['addNew','home'].includes(selectedChapter)?newChapter:selectedChapter,
            aboutUrl:data.Location,
            createdBy:session.user.id,
          }
          const response = await postLiteratureMaterial(payload)
          alert("Updated Successfully",response.data)
          window.location.reload()
        }
    })
  }

  return <div>
     <p className="text-2xl">Add/Modify Literature</p>
     <p>{session && session.user.name}</p>
     <div>
         <div className="grid grid-cols-2 items-center my-4 justify-between gap-8 ">
             <FormControl>
                <Select
                    value={selectedBook}
                    onChange={(e)=>onChangeBook(e)}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={"addNew"}>+ Add New Book</MenuItem>
                      {
                      uniqueBooks.map((item,key)=>{
                        return(
                          <MenuItem  key={key} value={item} >{item}</MenuItem>
                        )
                      })
                    }
                  </Select>
              </FormControl>
              {
                selectedBook==='addNew' &&
                <>
                <input 
                        className=" rounded pl-4 bg-slate-100 "
                        type="text"
                        value={newBook}
                        onChange={e=>setNewBook(e.target.value)}
                        placeholder='Enter Book Name'
                />
                </>
              }
         </div>
         <div className="grid grid-cols-2 items-center my-4 justify-between gap-8 ">
             <FormControl>
                <Select
                    value={selectedChapter}
                    onChange={(e)=>onChangeChapter(e)}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={"addNew"}>+ Add New Chapter</MenuItem>
                    <MenuItem value={"****"} >Home Page</MenuItem>
                    {
                      availableChapter.map((item,key)=>{
                        return(
                          <MenuItem key={key} value={item.chapter}>{item.chapter}</MenuItem>
                        )}
                      )
                    }
                  </Select>
              </FormControl>
              {
                ['addNew',''].includes(selectedChapter)
                &&
                <>
                    <input 
                            className=" rounded pl-4 bg-slate-100"
                            type="text"
                            value={newChapter}
                            onChange={e=>setNewChapter(e.target.value)}
                            placeholder='Enter Chapter Name'
                    />
                </>
              }
         </div>

     </div>
     <div className="my-8">
       <div className='border-2 rounded border-amber-500'>
        <textarea className='w-full h-96 bg-slate-50 p-2'
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder="Tailwind.css is supported"
        >
          {content}
        </textarea>
       </div>
       <div className='border-2 border-amber-500 rounded p-2 h-full max-h-96 overflow-auto'>
        {parse(content)}
       </div>
     </div>
     <button className='mt-4 py-2 basicDarkButton'
            onClick={handleSubmitLiterature}
         >
           Add/Edit
     </button>
  </div>;
};

DevLiterature.Layout=DashboardLayout

export default DevLiterature;

export async function getServerSideProps(context){
  const uniqueBooks=(await getUniqueBooks()).data
  return{
    props:{
      uniqueBooks,
    }
  }
}
