import React from 'react';
import TextEditor from "./TextEditor"
import {Select,Avatar} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import FormControl from '@mui/material/FormControl';
import { postBlogs } from '../../globalSetups/api';
import { uploadObject } from '../../globalSetups/aws/s3';
import { nanoid } from 'nanoid';
import {availableTravelBlogType} from "../../globalSetups/availableArrays"

const Blog = ({session}) => {
    const [category, setCategory] = React.useState('personal');
    const [heading,setHeading]=React.useState("");
    const [body,setBody]=React.useState("")
    const [location,setLocation]=React.useState("")
    const [selectedIndex,setSelectedIndex]=React.useState(0)
    
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
 

    const handleBlogSubmit = async() => {
        await uploadObject({file:body,filename:"spider8019"+nanoid()},async(err,data)=>{
            if(_.isNull(err)){
                const payload={
                  heading,
                  about:data.Location,
                  category,
                  location,
                  createdBy:session.user.id,
                  tourismType:selectedIndex
                }
                const response = await postBlogs(payload)
   
                console.log(response)
              }
          })
    }
    
    return <>

        <div className="my-4">
            <div className="flex justify-between items-center">
                <div className="my-8 text-black flex items-center">
                        <Avatar 
                        src={session.user.image}
                        alt={session.user.name}
                        sx={{ width: 46, height: 46 }}
                        />
                        <div className="ml-4">
                            <p className="font-semibold">
                                {session.user.name}
                            </p>
                            <FormControl>
                                        <Select
                                            value={category}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                            <MenuItem value={"personal"}>Personal</MenuItem>
                                            <MenuItem value={"tourism"} >Tourism</MenuItem>
                                        </Select>
                            </FormControl>
                        </div>
                </div>
                {
                    category==="tourism"
                    &&
                    <input 
                    className="my-4 rounded p-2 pl-4 bg-slate-100"
                    type="text"
                    value={location}
                    onChange={e=>setLocation(e.target.value)}
                    placeholder='Enter Location'
                    />
                }
            </div>
                {
                    category==="tourism"
                    &&
                    <div className="flex mb-4 w-full items-center justify-between">
                        <div className='flex'>
                            {
                            availableTravelBlogType.map((item,key)=>{
                                return (
                                    <div key={key}
                                        style={{borderColor:key===selectedIndex?"orange":"#ddd",boxShadow:key===selectedIndex?"1px 1px 10px #ddd":"none"}}
                                        className="cursor-pointer rounded-full mx-2 border-2 w-12 h-12 p-2"
                                        onClick={()=>setSelectedIndex(key)} 
                                    >
                                     <Image
                                        className="rounded-full border-4 border-orange-50" 
                                        src={`/static/${item.icon}`}
                                        alt={`${item.name}`}
                                        height={50}
                                        width={50}
                                        objectFit="cover"
                                      />
                                    </div>
                                )
                            })

                            }
                        </div>                  
                        <p>{availableTravelBlogType[selectedIndex].name}</p>
                    </div>
                }
            <div className=""> 
                <input 
                        className="my-2 w-full rounded p-2 pl-4 bg-slate-0"
                        type="text"
                        placeholder='Title'
                        value={heading}
                        onChange={e=>setHeading(e.target.value)}
                        style={{border:"1px solid #dadada",background:"#fafafa"}}
                        />
                <div>
                    <TextEditor content={body} setContent={setBody}/>
                </div>
                <button 
                    className=' py-2 mt-4 basicDarkButton'
                    onClick={handleBlogSubmit}
                    >
                    Upload Post
                </button>
            </div>
        </div>
  </>;
};


export default Blog;
