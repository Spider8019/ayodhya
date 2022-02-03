import React from 'react';
import TextEditor from "../../components/utils/TextEditor"
import {Select,Avatar} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { postBlogs } from '../../globalSetups/api';
import { uploadObject } from '../../globalSetups/aws/s3';
import { nanoid } from 'nanoid';


const Blog = ({session}) => {
    const [category, setCategory] = React.useState('personal');
    const [heading,setHeading]=React.useState("");
    const [body,setBody]=React.useState("")
    const [location,setLocation]=React.useState("")
    
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    console.log(session)
    
    const handleBlogSubmit = async() => {
        await uploadObject({file:body,filename:"spider8019"+nanoid()},async(err,data)=>{
            if(_.isNull(err)){
                const payload={
                  heading,
                  about:data.Location,
                  category,
                  location,
                  createdBy:session.user.id     
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
