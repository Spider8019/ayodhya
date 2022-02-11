import { nanoid } from "nanoid"
import Image from "next/image"
import styles from "../../styles/pages/Dashboard.module.css"
import VideoFrame from "./videoFrameForPost"
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const previewPost=({item})=>{
    switch(item.imageList[0].substring(item.imageList[0].lastIndexOf(".") + 1)){
        case "jpg":
        case "jpeg":
        case "png":
        case "tiff":
            return(
                <>
                <div className={styles.authPostContainer}>
                    <div className={styles.authPostContainer}>
                    <Image
                        src={item.imageList[0]}
                        alt={nanoid(10)}
                        height={100}
                        width={100}
                        layout="responsive"
                    objectFit='cover'
                        objectPosition='center'
                    />
                            <p className={styles.textForImageAuth}>{item.about.slice(0,25)}</p>
                    </div>
                </div>               
                </>)
        case "mp4":
        case "mov":
        case "ogg":
            return(
                <div className={`${styles.authPostVideoContainer}`}>
                    <VideoFrame muted={true} videoURL={item.imageList[0]}/>
                    <div className={`${styles.playPostButton}`}>
                        <PlayArrowOutlinedIcon className="text-white"/>
                        <p className={`${styles.textVideoPost} text-sm text-white`}>{item.about.slice(0,25)}</p>
                    </div>
                </div>
            )
        default:
            return(<p className="text-red-500 text-center">Something is wrong</p>)
            
    }
}

export default previewPost