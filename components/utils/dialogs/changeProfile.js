import React,{useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {uploadObject} from "../../../globalSetups/aws/s3.js"
import Image from 'next/image';
import styles from "../../../styles/utils/Dialog.module.css"
import {Select,Avatar} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { uploadProfilePicture} from '../../../globalSetups/api/index.js';
import {nanoid} from "nanoid"
import PreviewPost from "../previewPost"
import {mutate} from "swr"
import CameraIcon from '@mui/icons-material/Camera';

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

export default function DraggableDialog({profileId}) {
  const [open, setOpen] = React.useState(false);
  const [fileBody,setFileBody]=React.useState(null)
  const [file,setFile]=React.useState("/static/Preview.png")
  const [someData,setSomeData]=React.useState(false)
  const [category, setCategory] = React.useState('photography');
  const [about,setAbout]=React.useState("");
  const [processing,setProcessing]=React.useState(false)
  const [crop, setCrop] = useState({ aspect: 9 / 9 })

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
        var file  = e.target.files[0];
  
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onprogress=(event)=>{
            console.log(event)
        }
        reader.onloadend=(event)=>{
            setFile(URL.createObjectURL(e.target.files[0]))
            setSomeData(true)
            setFileBody(e.target.files[0])

        }
    }

  const handleUploadFile=async()=>{
       setProcessing(true)
await uploadObject({file:fileBody,filename:"spider8019"+nanoid(10)+"profile."+fileBody.name.substring(fileBody.name.lastIndexOf(".") + 1)},async(err,data)=>{
  console.log(data,err)
  if(_.isNull(err)){
      const payload={
        location:data.Location,
        id:profileId
      }
      const response=await uploadProfilePicture(payload)
      if(response.status===200){
        mutate('GetBasicDetail')
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
      <div 
        onClick={handleClickOpen}
        className="cursor-pointer bg-slate-100 rounded-full grid place-items-center"
        style={{height:"150px",width:"150px"}}>
                <CameraIcon className='h-2/4 w-2/4 text-slate-800'/>
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
          Upload New Profile Picture
        </DialogTitle>
        <DialogContent>
          <div className="addPostDialogBody">

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
                      <ReactCrop 
                        src={file} 
                        crop={crop} 
                        onChange={newCrop => setCrop(newCrop)} />
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
