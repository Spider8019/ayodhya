import * as React from 'react'
import styles from "../../../styles/utils/Dialog.module.css"
import {mutate} from "swr"
import {motion,AnimatePresence} from "framer-motion"
import {zeroHeightAndWidth,yMove} from "../../../globalSetups/framer"
import { notify, notifyerror, notifysuccess, notifywarn } from '../../snackbar/index.js';
import { editProfileAboutName } from '../../../globalSetups/api/index.js';

export default function DraggableDialog({name,about,email}) {

  const [event,setEvent]=React.useState({name,about,email})
  const [show,setShow]=React.useState(false)
  const [processing,setProcessing]=React.useState(false)


  const handleSubmit=async(e)=>{
        e.preventDefault()
        if(name===event.name && about===event.about)
          return notifywarn("You haven't made any changes.")
        else{
            setProcessing(true)
            const response=await editProfileAboutName(event)
            if(response.status===200){
                notifysuccess("Profile updated Successfully")
                setShow(false)
                mutate("GetBasicDetail")
            }
            else{
                notifyerror("Something went wrong while updating your profile.")
            }
            setProcessing(false)
        }

  }
  return (
    <div
       className={styles.addPostButton}  

    >
      <div
         className='text-center'
         onClick={()=>setShow(!show)}
      >
         <p>Your profile should be updated.</p>
      </div>
      <AnimatePresence>
          {
            show 
              &&
            <motion.div
                initial="initial"
                exit="initial"
                animate="final"
                variants={zeroHeightAndWidth}
                className="bg-slate-100 rounded p-2 mt-4 cursor-default"
            >
                <form onSubmit={handleSubmit}>
                    <motion.p 
                        variants={yMove}
                        title="Not Editable"
                        className="cursor-not-allowed text-sm my-2">{event.email}</motion.p>
                    <motion.input 
                        variants={yMove}
                        className="focus:bg-white outline-none rounded  text-sm my-2 bg-transparent w-full"
                        type="text"
                        value={event.name}
                        onChange={e=>setEvent({...event,name:e.target.value})}
                    />
                    <motion.textarea 
                        variants={yMove}
                        className="focus:bg-white outline-none rounded text-sm my-2 bg-transparent w-full"
                        type="text"
                        value={event.about}
                        onChange={e=>setEvent({...event,about:e.target.value})}
                    />
                    <motion.button 
                        type="submit"
                        variants={yMove}
                        style={{cursor:processing?"no-drop":"pointer"}}
                        className="p-2 px-4 bg-amber-500 rounded text-white text-sm"
                        >
                        {processing?"Updating...":"Update"}
                    </motion.button>
                </form>
            </motion.div>
          }
      </AnimatePresence>
    </div>
  );
}
