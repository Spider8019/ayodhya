import React from 'react';
import { literatureSideBar } from '../../globalSetups/availableArrays';
import {useRouter} from "next/router"
import Link from 'next/link';
import { IconButton } from '@mui/material';
import {getLiteratureSideBar} from "../../globalSetups/api"
import styles from "../../styles/pages/Dashboard.module.css"
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import useSWR from "swr"
import LoaderSideBar from "../global/LoaderSideBar"
import MenuIcon from '@mui/icons-material/Menu';
import {isMobile,MobileView} from "react-device-detect"

const Layout = ({children}) => {

  const router=useRouter()
  const {data:literatureSideBar,error}=useSWR('/literatureSideBar',getLiteratureSideBar,{revalidateOnFocus:false})
  if(error)
    return "error"

  return <div className={`grid h-screen ${styles.parentContainer}`} style={{gridTemplateRows:"1fr",gridTemplateColumns:isMobile?"1fr":"300px auto"}}>
      <div className={`${styles.sideNavContainer}`} >
          <MobileView>
            <IconButton className="absolute top-4 left-4">
                <MenuIcon/>
            </IconButton>
          </MobileView>
          {
              !literatureSideBar
              ?
              <LoaderSideBar/>
              :
              <ul className=" my-4 block">
                {
                    literatureSideBar.data.map((item,index)=>{
                        return(
                            <li 
                                key={index}
                                className={`p-1 pl-4 border-l-4 ${router.query.book && router.query.book.includes(item.book) ? "border-amber-500" :"border-transparent"}`}
                            >
                                <Link prefetch={false} href={`?book=${item.book}&chapter=****`}
                                >
                                    <a 
                                        className={`flex align-center `}
                                        onClick={(e)=>{
                                            document.getElementById("literatureSidebarSub"+index).classList.toggle("subListToggle")
                                            document.getElementById("literatureSidebarKey"+index).classList.toggle("keyToggle")
                                        }}       
                                    ><ChevronRightOutlinedIcon 
                                        style={{transition:"all 0.3s ease"}}
                                        id={"literatureSidebarKey"+index}
                                    /><span className="ml-2">{item.book}</span></a>
                                </Link>
                                <ol
                                id={"literatureSidebarSub"+index}
                                className={`initialStateOfSublist mx-4 mt-2`}
                                >
                                    {
                                        item.chapters && item.chapters.map((sub,location)=>{
                                            return(
                                                <li key={sub.chapter}
                                                    className={`rounded ${router.query.chapter && router.query.chapter.includes(sub.chapter) && "bg-slate-200"}`}
                                                > 
                                                    <Link prefetch={false} href={`?book=${sub.book}&chapter=${sub.chapter}`}>
                                                        <a className="flex align-center rounded-md"><ChevronRightOutlinedIcon/><span className="ml-2">{sub.chapter}</span></a>
                                                    </Link> 
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                            </li>
                        )
                    })
                }     
           </ul>
          }
          

      </div>
      <div className={'m-4'}>
          {children}
      </div>
      <style global jsx>{`
        .initialStateOfSublist{
            transition:all 0.3s ease;
            overflow:hidden;
            max-height:0;
        }
        .subListToggle {
          display:block;
          max-height:200px;
        }
        .keyToggle{
            transform:rotate(90deg);
        }
      `}</style>
  </div>;
};

export default Layout;

export async function getServerSideProps(context){
    return {
        props:{
            literatureSideBar
        }
    }
}
