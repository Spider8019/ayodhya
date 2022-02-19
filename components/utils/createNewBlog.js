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
import {motion,AnimatePresence} from "framer-motion"
import { zeroHeightAndWidth,xMove} from '../../globalSetups/framer';

const Blog = ({session}) => {
    const [category, setCategory] = React.useState('personal');
    const [heading,setHeading]=React.useState("");
    const [body,setBody]=React.useState("")
    const [location,setLocation]=React.useState("")
    const [selectedIndex,setSelectedIndex]=React.useState(0)
    const [showCreateBlog,setShowCreateBlog]=React.useState(false)
    
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

        <button className='p-2 rounded-t text-white font-semibold tracking-widest  bg-amber-500 w-full mt-4'
            onClick={()=>setShowCreateBlog(!showCreateBlog)}
        >Write new blog</button>
        <AnimatePresence>
            {
                showCreateBlog
                &&
                <motion.div 
                    initial="initial"
                    exit="initial"
                    animate="final"
                    variants={zeroHeightAndWidth}
                    className="p-2 rounded-b" 
                    style={{boxShadow:"1px 1px 10px rgba(0,0,0,0.164)"}}>
                    <motion.div 
                        variants={xMove}
                        className="flex justify-between items-center">
                        <motion.div className="mb-4 text-black flex items-center">
                                <Avatar 
                                src={session && session.user.image}
                                alt={session && session.user.name}
                                sx={{ width: 46, height: 46 }}
                                />
                                <motion.div className="ml-4">
                                    <motion.p className="font-semibold">
                                        {session && session.user.name}
                                    </motion.p>
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
                                </motion.div>
                        </motion.div>
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
                    </motion.div>
                        {
                            category==="tourism"
                            &&
                            <motion.div className="flex mb-4 w-full items-center justify-between">
                                <motion.div className='flex'>
                                    {
                                        availableTravelBlogType.map((item,key)=>{
                                            return (
                                                <motion.div key={key}
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
                                            </motion.div>
                                        )
                                    })
                                    
                                }
                                </motion.div>                  
                                <motion.p>{availableTravelBlogType[selectedIndex].name}</motion.p>
                            </motion.div>
                        }
                    <motion.div 
                        className=""> 
                        <motion.input  
                                variants={xMove}
                                className="my-2 w-full rounded p-2 pl-4 bg-slate-0"
                                type="text"
                                placeholder='Title'
                                value={heading}
                                onChange={e=>setHeading(e.target.value)}
                                style={{border:"1px solid #dadada",background:"#fafafa"}}
                                />
                        <motion.div variants={xMove}>
                            <TextEditor content={body} setContent={setBody}/>
                        </motion.div>
                        <motion.button 
                            variants={xMove}
                            className=' py-2 mt-4 basicDarkButton'
                            onClick={handleBlogSubmit}
                            >
                            Upload Post
                        </motion.button>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
  </>;
};


export default Blog;
