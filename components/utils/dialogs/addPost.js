import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {uploadObject} from "../../../globalSetups/aws/s3.js"
import Image from 'next/image';
import styles from "../../../styles/utils/Dialog.module.css"

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

export default function DraggableDialog() {
  const [open, setOpen] = React.useState(false);
  const [fileBody,setFileBody]=React.useState(null)
  const [file,setFile]=React.useState("/static/Preview.png")
  const [someData,setSomeData]=React.useState(false)

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

            setFile(event.target.result)
            setSomeData(true)
        }
    }
    const handleUploadFile=async()=>{
    console.log(await uploadObject({file:fileBody}))
    console.log(fileBody)
    }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <div className="my-2 text-black">
              <p className="font-semibold">
                Aman Pratap Singh
              </p>
          </div>
          <div className="addPostDialogBody">
                <div className="addPostInputText mt-4">
                    <textarea
                        className="textarea"
                        placeholder='Whats on your mind'
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
            <button onClick={handleClose}
                className="mr-2 basicDarkButtonInvert"
            >
                Cancel
            </button>
            <button 
                className="basicDarkButton px-4 py-2"
                onClick={handleUploadFile}>
                    Upload
            </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
