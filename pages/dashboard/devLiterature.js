import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import parse from 'html-react-parser';
import {Select,Avatar} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextEditor from "../../components/utils/TextEditor"
import { getSession, useSession } from 'next-auth/react';
import { getUniqueBooks, postLiteratureMaterial,getChaptersForABook,getContextForASpecificLiterature } from '../../globalSetups/api';
import { uploadObject } from '../../globalSetups/aws/s3';
import { nanoid } from 'nanoid';
import _ from "lodash"
import axios from 'axios';

const DevLiterature = ({uniqueBooks}) => {

  const [selectedBook,setSelectedBook]=React.useState("addNew")
  const [newBook,setNewBook]=React.useState("")
  const [selectedChapter,setSelectedChapter]=React.useState("addNew")
  const [newChapter,setNewChapter]=React.useState("")
  const [content,setContent]=React.useState("")
  const [availableChapter,setAvailableChapters]=React.useState([])
  const {data:session,status}=useSession()

  const onChangeBook=async (e)=>{
    setSelectedBook(e.target.value)
    if(e.target.value!=="addNew")
    {
     const getChapters=await getChaptersForABook({book:e.target.value})
     setAvailableChapters(getChapters.data)
    }
  }
  const onChangeChapter = async(e)=>{
    setSelectedChapter(e.target.value)
    console.log(selectedBook,e.target.value)
    if(e.target.value!=="addNew")
    {
     const getContext=await getContextForASpecificLiterature({book:selectedBook,chapter:e.target.value})
     const contextData=(await axios.get(getContext.data.aboutUrl))
     if(contextData.status===200)
      setContent(contextData.data)  
    }
  }
  const handleSubmitLiterature=async()=>{
    await uploadObject({file:content,filename:"spider8019_literature"+nanoid(4)},async(err,data)=>{
      if(_.isNull(err)){
          const payload={
            book:selectedBook==='addNew'?newBook:selectedBook,
            chapter:['addNew','home'].includes(selectedChapter)?newChapter:selectedChapter,
            aboutUrl:data.Location,
            createdBy:session.user.id,
          }
          const response = await postLiteratureMaterial(payload)

          console.log(response)
        }
    })
  }

  return <div>
     <p className="text-2xl">Add/Modify Literature</p>
     <p>{session.user.id}{session.user.name}</p>
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
                    <MenuItem value={""} >Home Page</MenuItem>
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
         <div>
             <TextEditor content={content} setContent={setContent}/>
         </div>
         <button className='mt-4 py-2 basicDarkButton'
            onClick={handleSubmitLiterature}
         >
           Add/Edit
         </button>
     </div>
     <div className="my-8">
       {parse(content)}
       {content}
     </div>
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
