import React,{useState} from 'react';
import useTranslation from 'next-translate/useTranslation'
import styles from "../styles/pages/Login.module.css"
import Image from "next/image"
import Link from 'next/link';
import Head from 'next/head';
import AbcIcon from '@mui/icons-material/Abc';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Login = () => {

  let  { t }= useTranslation()
  const [passwordShow,setPasswordShow]=useState(false)

  const handleTogglePasswordVisibility = (e) =>{
     e.preventDefault()
     setPasswordShow(!passwordShow)
  }

  return <div className={styles.loginContainer}>
      <Head>
        <title>{t('common:page_title.login')}</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/static/withOutBgLogo.png" />
      </Head>
      <div className={` rounded-xl ${styles.loginMain} grid grid-cols-2 `}>
        <div className='grid place-items-center'>
           <div className="w-2/3">
             <center>
                <Image
                    layout="intrinsic"
                    height={100}
                    width={100}
                    src="/static/withOutBgLogo.png"
                    alt="Without Background Logo"
                />
                <p className="text-4xl">Ikshvaku</p>
                <span className="text-1xl block">Ayodhya</span>
                <form 
                  className="mt-4">
                    <input 
                      className="standardInput bg-gray-50"
                      style={{width:"calc(100% - 1rem)"}}
                      type="email"
                      placeholder='Enter your mail'
                      />
                    <div className='relative'>
                      <input 
                        className='standardInput bg-gray-50'
                        style={{width:"calc(100% - 1rem)"}}
                        type={passwordShow ? "text" : "password"}
                        placeholder='Password'
                        />
                      <button 
                        style={{height:"calc(100% - 1rem)"}}
                        className='absolute top-0 right-0 px-2 mt-2 mb-2 mr-2'
                        onClick={handleTogglePasswordVisibility}>
                          {passwordShow ? <MoreHorizIcon/> : <AbcIcon/>}
                      </button>
                    </div>
                    <button className="block basicDarkButton m-2 mt-8 p-2"
                      style={{width:"calc(100% - 1rem)"}}
                      >
                      Login   
                    </button>
                </form>
                <Link href="/signup">
                    <a className='text-xs mt-8 inline-block'>Don&apos;t have a account</a>
                </Link>
             </center>
           </div>
        </div>
        <div className={`rounded-xl relative`}>
          <div  
            className='rounded-xl absolute w-full bottom-0 right-0' 
            style={{height:"115%"}}>
            <Image
              className='rounded-xl'
              style={{boxShadow:"1px 1px 10px gray"}}
              layout="fill"
              objectFit='contain'
              objectPosition="bottom right"
              src="/static/pages/login.png"
              alt="Image Ramayan Login"
            />      
          </div>    
        </div>
      </div>
  </div>;
};

export default Login;
