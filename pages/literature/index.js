import axios from 'axios';
import React from 'react';
import LiteratureLayout from "../../components/layout/literatureLayout"
import parse from 'html-react-parser';
import {getSpecificLiteratureDetails}  from "../../globalSetups/api"
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Head from 'next/head';
import Link from "next/link"

const LiteratureContainer = ({data,htmlData,error}) => {

  if(error){
    return <div style={{height:"calc(100vh - 10rem)"}} 
      className="grid place-items-center"
    >
        <div className='flex flex-col items-center'>
          <SentimentDissatisfiedIcon className="text-8xl text-slate-300"/>
          <p className="text-2xl text-center text-slate-300">Unable to Fetch the requested document</p>
        </div>
      </div>
  }
  return <div>
    <Head>
      <title>
        Literature - Ikshvaku
      </title>
    </Head>
    {
      data.homepage 
      ?
      <div>
        <p className="text-8xl">Literature</p>
        <div className='my-4 flex flex-wrap'>
          <Link
          href=""
          >
            <a className='text-xl bg-amber-50 border border-amber-500 p-8 rounded'>
              Hanuman Ji
            </a>        
          </Link>
        </div>
      </div>
      :
      <>
        {parse(htmlData)}
        <p className='my-4'>{data.data.aboutUrl}</p>
      </>
    }

  </div>;
};

LiteratureContainer.Layout = LiteratureLayout

export default LiteratureContainer;

export async function getServerSideProps(context){
  const {query}=context;
  let data=(await getSpecificLiteratureDetails({query})).data
  console.log(data)
  if(data.homepage===true)
  return{
    props:{
      data:data,
      htmlData:"",
      error:null
    }
  }
  
  if(data.homepage===false && data.data){
    const htmlData=(await axios.get(data.data.aboutUrl)).data
    if(htmlData){
      return{
        props:{
          data:data,
          htmlData:htmlData,
          error:null          
        }
      }
    }
  }
  else{
    return{
      props:{
        data:null,
        htmlData:null,
        error:"Not Found"          
      }
    }
  }


}
