import React from 'react'
import Head from 'next/head'

const Thanks = () => {
  return (
    <div className='m-20'>
        <Head>
            <title>
                Thanks to - Ikshvaku 
            </title>
        </Head>
            <p className='text-4xl font-bold text-amber-500'>Special Thanks to </p>
            <div className='mt-12'>
                <p> Aman Pratap Singh, Anjali Singh, Alka Singh, Mahant Ramdas, K.K.Tiwari</p>
            </div>
            <p className='text-4xl font-bold text-amber-500 mt-20'>References </p>
            <div className='mt-12'>
                <p>www.holifestival.org</p>
            </div>
    </div>
  )
}

export default Thanks