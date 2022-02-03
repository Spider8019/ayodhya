import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {uploadObject} from "../../../globalSetups/aws/s3.js"
import Image from 'next/image';
import styles from "../../../styles/utils/Dialog.module.css"
import {Select,Avatar} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { uploadPost } from '../../../globalSetups/api/index.js';
import {nanoid} from "nanoid"
import {mutate} from "swr"

function PaperComponent(props) {
  return (
    <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({name,avatar}) {
  const [open, setOpen] = React.useState(false);
  const [fileBody,setFileBody]=React.useState(null)
  const [file,setFile]=React.useState("/static/Preview.png")
  const [someData,setSomeData]=React.useState(false)
  const [category, setCategory] = React.useState('photography');
  const [about,setAbout]=React.useState("");
  const [processing,setProcessing]=React.useState(false)

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseWithCleanUp=()=>{
    handleClose()
    setAbout("");
    setCategory('photography')
  }

  const handleFile=(e)=>{
    setFileBody(e.target.files[0])
        var file  = e.target.files[0];
        var reader = new FileReader();
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
        }
        reader.onprogress=(event)=>{
            console.log(event)
        }
        reader.onloadend=(event)=>{
            setFile(URL.createObjectURL(e.target.files[0]))
            setSomeData(true)
        }
    }
    const handleUploadFile=async()=>{
      setProcessing(true)
      await uploadObject({file:fileBody,filename:"spider8019"+nanoid()+fileBody.name},async(err,data)=>{
        if(_.isNull(err)){
            const payload={
              location:data.Location,
              category,
              about,
            }
            const response=await uploadPost(payload)
            if(response.status===200){
              mutate('GetPostsOfAuthenticatedPerson')
              handleCloseWithCleanUp()
            }
            else{
              alert("Something went wrong")
            }
            setProcessing(false)
          }
      })


    }

  return (
    <div>
      <div onClick={handleClickOpen}
        className={styles.addPostButton}  
      >
         <p>Whats on your mind?</p>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move',textAlign:"Center" }} id="draggable-dialog-title">
          Create Post
        </DialogTitle>
        <DialogContent>
          <div className="my-2 text-black flex items-center">
            <Avatar 
              src={avatar}
              alt={name}
              sx={{ width: 46, height: 46 }}
            />
            <div className="ml-4">
              <p className="font-semibold">
                {name}
              </p>
              <FormControl>
                <Select
                    value={category}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={"photography"}>Photography</MenuItem>
                    <MenuItem value={"music"} >Music</MenuItem>
                    <MenuItem value={"dance"} >Dance</MenuItem>
                    <MenuItem value={"writing"} >Writing</MenuItem>
                    <MenuItem value={"crafts"} >Crafts</MenuItem>
                    <MenuItem value={"artworks"} >Artworks</MenuItem>
                    <MenuItem value={"others"} >Others</MenuItem>
                  </Select>
              </FormControl>
            </div>
          </div>
          <div className="addPostDialogBody">
                <div className="addPostInputText mt-4">
                    <textarea
                        className="textarea"
                        placeholder='Whats on your mind'
                        type="text"
                        value={about}
                        onChange={e=>setAbout(e.target.value)}
                    >

                    </textarea>
                </div>
                <label className="my-4 custom-file-upload w-full text-center">
                    <input
                        onChange={handleFile}
                        type="file"/>
                    {someData ? 'Replace Media' : 'Add Media'}
                </label>
                {
                someData
                &&
                <div className='w-full p-2 border border-black'>
                    <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "100%",
                        height: "200px",
                        maxHeight: "200px",
                      }}
                    >
                        <Image
                            className="refPre"
                            layout="fill" 
                            style={{
                                width: "100%",
                                maxWidth: "100%",
                                height: "200px",
                                maxHeight: "200px",
                              }}
                            objectFit='cover'
                            src={file} 
                            alt="Preview Image"
                        />
                    </div>
                </div>
                }
            </div>
        </DialogContent>
        <DialogActions>
            <button onClick={handleCloseWithCleanUp}
                className="mr-2 basicDarkButtonInvert"
            >
                Cancel
            </button>
            <button 
                className="basicDarkButton px-4 py-2"
                onClick={handleUploadFile}>
                    {processing ? <p>Uploading...</p> : <p>Upload</p>}
            </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
