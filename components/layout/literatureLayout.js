import React from 'react';
import { literatureSideBar } from '../../globalSetups/availableArrays';
import {useRouter} from "next/router"
import Link from 'next/link';
import styles from "../../styles/pages/Dashboard.module.css"
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const Layout = ({children}) => {

  const router=useRouter()

  return <div className={`grid h-screen ${styles.parentContainer}`} style={{gridTemplateColumns:"300px auto"}}>
      <div className={`${styles.sideNavContainer}`} >
          <ul className=" my-4 block">
              {
                  literatureSideBar.map((item,index)=>{
                      return(
                        <li 
                            key={index}
                            className={`p-1 pl-4 border-l-4 ${router.pathname.includes(item.url) ? "border-amber-500" :"border-transparent"}`}
                        >
                            <Link prefetch={false} href={"/literature/"+item.url}
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
                                  /><span className="ml-2">{item.title}</span></a>
                            </Link>
                            <ol
                              id={"literatureSidebarSub"+index}
                              className={`initialStateOfSublist mx-4 mt-2`}
                            >
                                {
                                    item.subtitles && item.subtitles.map((sub,location)=>{
                                        return(
                                            <li key={location}
                                                className={`rounded ${router.pathname.includes(sub.url) && "bg-slate-200"}`}
                                            > 
                                                <Link prefetch={false} href={"/literature"+item.url+"/"+sub.url}>
                                                    <a className="flex align-center rounded-md"><ChevronRightOutlinedIcon/><span className="ml-2">{sub.title}</span></a>
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
