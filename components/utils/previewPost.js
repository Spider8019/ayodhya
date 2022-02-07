import Image from "next/image"
import styles from "../../styles/Gallery.module.css"

const previewPost=({file,fileExtension})=>{
    switch(fileExtension){
        case "jpg":
        case "jpeg":
        case "png":
        case "tiff":
            return(
                <>
                <div className={styles.galleryImage}
                    style={{margin:0,borderRadius:"0"}}
                >
                    <div
                    style={{
                        width: "100%",
                        background:"red"
                        }}
                    >
                        <Image
                            className={styles.imageUnsized}
                            layout="responsive" 
                            height={5000}
                            width={0}
                            objectFit='cover'
                            src={file} 
                            alt="Preview Image"
                        />

                    </div>
                </div>

                </>)
        case "mp4":
        case "mov":
        case "ogg":
            return(
                <video className="rounded" style={{height:"calc(100% - 0.5rem)",width:"100%"}} controls>
                    <source src={file} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            )
        default:
            return(<p className="text-red-500 text-center">Extension doesn&apos;t match</p>)
            
    }
}

export default previewPost