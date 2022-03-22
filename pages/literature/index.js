import axios from 'axios';
import React,{useState} from 'react';
import LiteratureLayout from "../../components/layout/literatureLayout"
import parse from 'html-react-parser';
import {getSpecificLiteratureDetails}  from "../../globalSetups/api"
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Head from 'next/head';
import Link from "next/link";
import Image from "next/image"
import {notifyerror, notifysuccess} from "../../components/snackbar"
import { translateTxt } from '../../globalSetups/aws/translate';

const LiteratureContainer = ({data,htmlData,error}) => {

  const [word,setWord]=useState("")
  async function getSelectedText() {
    var selectedText = '';

    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection();
    }
    // document.getSelection
    else if (document.getSelection) {
        selectedText = document.getSelection();
    }
    // document.selection
    else if (document.selection) {
        selectedText = document.selection.createRange().text;
    } else return;
    if(selectedText){
      try{
        const data=await axios({
            method:"get",
            url:"https://api.dictionaryapi.dev/api/v2/entries/en/"+selectedText
        })
        if(data.status===200){
            notifysuccess("Meaning : "+data.data[0].meanings[0].definitions[0].definition)
        }
        else{
          console.log(data)
        }
      }
      catch(e){
        return null;
      }
  }
}



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
        <p className="text-5xl">Literature</p>
        <p className='mt-4'>Enhance your knowledge without trusting anyone else.</p>
        <p>Enjoy our extensive online library, which includes newspapers, epics, and award-winning author books.</p>
        <div className='my-4 flex flex-wrap'>
          <Link
          href="/literature?book=Hanuman%20Ji&chapter=****"
          >
            <a className='text-xl bg-amber-50 border border-amber-500 px-8 py-4 rounded'>
              Hanuman Ji
            </a>        
          </Link>
        </div>
      </div>
      :
      <>
        <div className="withMeanings" >
          <div onMouseUp={getSelectedText}>
            {parse(htmlData)}
          </div>
        </div>
        <div className="mt-20 mx-20 grid place-items-center">
          <p className="text-xs text-gray-400">Ikshvaku.com is designed to help you learn. To increase reading and learning, examples could be simplified. References and sources are regularly checked for inaccuracies, but we cannot guarantee that all content is completely accurate. You agree to have read and accepted our terms of service, cookie policy, and privacy policy while using Ikshvaku.</p>
          <Image 
             className="my-4 block"
             src="/static/withOutBgLogo.png"
             alt="Company Logo"
             width="60"
             height="60"
          />
        </div>
      </>
    }

  </div>;
};

LiteratureContainer.Layout = LiteratureLayout

export default LiteratureContainer;

export async function getServerSideProps(context){
  const {query,locale}=context;
  let data=(await getSpecificLiteratureDetails({query})).data
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
      switch(locale){
        case 'hn':
          await translateTxt({text:"aman pratap singh",TCode:"hi"},async(err,data)=>{
            console.log(data)
          })
        case 'en-US':
                  return{
                      props:{
                        data:data,
                        htmlData:htmlData,
                        error:null          
                      }
                    }
        // case 'hn':

          // return{
            // props:{
            //   data:data,
            //   htmlData:"temp.TranslatedText",
            //   error:null
            // }}
                  // const temp=await translateTxt({text:"guru randhawa"},(async (err,tre)=>{
                  //    return{
                  //     props:{
                  //       data:data,
                  //       htmlData:"temp.TranslatedText",
                  //       error:null
                  //     }
                  //   }
                  //  }
                  // ))
                  break;
            default:return 
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
