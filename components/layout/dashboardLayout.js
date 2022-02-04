import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/router"
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import styles from "../../styles/pages/Dashboard.module.css"
import { signOut } from 'next-auth/react';
import {defaultOptions} from '../../globalSetups/availableArrays'


const Index = ({children}) => {

  const router=useRouter()

  return <div className={`grid h-screen ${styles.parentContainer}`} style={{gridTemplateColumns:"300px auto"}}>
      <div className={`${styles.sideNavContainer} bg-amber-50`} >
          <div 
            className="mx-auto my-8 grid place-items-center"
          >
            <Image
                height={100}
                width={100}
                src="/static/withOutBgLogo.png"
                alt="Dashboard Ikshvaku Logo"
            />
          </div>
          <ul className=" my-4 block">
              <li className={`p-2 my-2 pl-8 border-l-4 ${router.pathname == "/dashboard" ? " border-amber-500":"border-transparent"}`}>
                  <Link href="/dashboard">
                      <a className="flex align-center"><HomeOutlinedIcon/><span className="ml-2">Dashboard</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 pl-8 border-l-4 ${router.pathname == "/dashboard/tabulate" ? " border-amber-500":"border-transparent"}`}>
                  <Link href="/dashboard/tabulate">
                      <a className="flex align-center"><EqualizerOutlinedIcon/><span className="ml-2">Tabulate</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 pl-8 border-l-4 ${router.pathname == "/dashboard/blog" ? " border-amber-500":"border-transparent"}`}>
                  <Link href="/dashboard/blog">
                      <a className="flex align-center"><HistoryEduIcon/><span className="ml-2">Write Blog</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 pl-8 border-l-4 border-transparent`}>
                  <p>
                      <a
                        onClick={()=>signOut({ callbackUrl: defaultOptions.baseUrl })} 
                        className="flex align-center"><LockOutlinedIcon/><span className="ml-2">Logout</span></a>
                  </p>
              </li>
          </ul>

      </div>
      <div className={'m-4'}>
          {children}
      </div>
  </div>;
};

export default Index;
