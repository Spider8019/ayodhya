import React,{useState} from 'react';
import useTranslation from 'next-translate/useTranslation'
import styles from "../../styles/pages/Login.module.css"
import Image from "next/image"
import Head from 'next/head';
import AbcIcon from '@mui/icons-material/Abc';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import _ from "lodash"
import {getCsrfToken, signIn } from "next-auth/react"
import {BrowserView} from "react-device-detect"

export default function Login ({csrfToken}){

  let  { t }= useTranslation()
  const [passwordShow,setPasswordShow]=useState(false)
  const [formData,setFormData]=useState({email:"",password:"",csrfToken:csrfToken})

  const handleTogglePasswordVisibility = (e) =>{
     e.preventDefault()
     setPasswordShow(!passwordShow)
  }

  const handleLogin=async(e)=>{
      e.preventDefault()
      signIn("credentials", { email:formData.email,password:formData.password })
  }

  
  return <div className={styles.loginContainer}>
      <Head>
        <title>{t('common:page_title.login')}</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/static/withOutBgLogo.png" />
      </Head>
      <div className={` rounded-xl ${styles.loginMain} grid grid-cols-1 sm:grid-cols-2 `}>
        <div className='grid place-items-center'>
           <div className=" sm:w-2/3">
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
                  onSubmit={handleLogin}
                  className="mt-4">
                    <input 
                      className="standardInput bg-gray-50"
                      style={{width:"calc(100% - 1rem)"}}
                      type="email"
                      placeholder='Enter your mail'
                      value={formData.email}
                      onChange={e=>setFormData({...formData,email:e.target.value})}
                      />
                    <div className='relative'>
                      <input 
                        className='standardInput bg-gray-50'
                        style={{width:"calc(100% - 1rem)"}}
                        type={passwordShow ? "text" : "password"}
                        placeholder='Password'
                        value={formData.password}
                        onChange={e=>setFormData({...formData,password:e.target.value})}  
                        />
                      <button 
                        style={{height:"calc(100% - 1rem)"}}
                        className='absolute top-0 right-0 px-2 mt-2 mb-2 mr-2'
                        onClick={handleTogglePasswordVisibility}>
                          {passwordShow ? <MoreHorizIcon/> : <AbcIcon/>}
                      </button>
                    </div>
                    <button className="block basicDarkButton m-2 mt-8 p-2 py-2"
                      style={{width:"calc(100% - 1rem)"}}
                    >
                      Login   
                    </button>
                </form>
                {/* <div className='relative h-px w-1/2 bg-slate-300 mt-8'>
                    <p className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-2 text-xs'>or</p>
                </div> */}
                {/* <div className={`${styles.providerLoginsContainer} mt-4`}>
                    { !_.isNull(Object.values(providers)) && Object.values(providers).map((provider) => (
                      provider.id!=='credentials' 
                      &&
                      <div key={provider.name}>
                          <IconButton onClick={() => signIn(provider.id)}>
                              <GitHubIcon/>
                          </IconButton>
                      </div>
                    ))}
                </div> */}
             </center>
           </div>
        </div>

        <div className={`rounded-xl relative`}>
          <BrowserView>
              <div  
                className='rounded-xl absolute w-full bottom-0 right-0' 
                style={{height:"115%"}}>
                <Image
                  className='rounded-xl'
                  layout="fill"
                  objectFit='contain'
                  objectPosition="bottom right"
                  src="/static/pages/login.png"
                  alt="Image Ramayan Login"
                />      
              </div>    
          </BrowserView>
        </div>
      </div>
  </div>;
};


export async function getServerSideProps(context) {
  const csrfToken =await getCsrfToken(context)
  return {
    props: { 
      csrfToken:csrfToken  
    },
  }
}