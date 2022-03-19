import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

const Ec = () => {

  let  { t }= useTranslation()

  const plumbers=[{
      name:"Rajinder Yadav",
      contact:"9044130838",
      place:"Naka"
  }]

  return (
        <div 
            className='m-4 sm:m-20'>
            <Head>
                <title>{t('common:navbar.ec')}</title>
            </Head>
            <p className="text-4xl font-bold text-amber-500">{t('common:navbar.ec')}</p>
            <div>
                <p className='text-2xl font-semibold mt-8'>{t('common:navbar.ecplumber')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-8">
                    {
                        plumbers.map((item,key)=>{
                            return(<div key={key}
                                className="my-4 text-gray-400 italic"
                            >
                                <p>{item.name}</p>
                                <p>{item.contact}</p>
                                <p>{item.place}</p>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default Ec