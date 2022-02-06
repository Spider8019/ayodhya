import axios from 'axios';
import React from 'react';
import LiteratureLayout from "../../components/layout/literatureLayout"
import {getSpecificLiteratureDetails}  from "../../globalSetups/api"

const LiteratureContainer = ({data,htmlData}) => {
  // console.log(data.homepage,typeof(data.homepage))
  return <div>

    {
      data.homepage 
      ?
      <div>
        rajput literature
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
        <p className="text-8xl">working on version 1 is in progress</p>
      </div>
      :
      <>
        <p>{data.data.aboutUrl}</p>
        {console.log(data.data)}
        <p>{htmlData} gurur adanawha</p>
      </>
    }

  </div>;
};

LiteratureContainer.Layout = LiteratureLayout

export default LiteratureContainer;

export async function getServerSideProps(context){
  const {query}=context;
  let data=(await getSpecificLiteratureDetails({query})).data
  if(data.homepage===false){
    const htmlData=(await axios.get(data.data.aboutUrl)).data
    return{
      props:{
        data:data,
        htmlData:htmlData
      }
    }
  }

  return{
    props:{
      data:data,
      htmlData:""
    }
  }
}
