import React from 'react'
import Link from "next/link"

const NotFound = () => {
  return (
    <div
      className='PNFContainer'
    >
        <Link href="/" ><a className=' block border-2 border-white rounded text-white text-semibold px-8 py-4 text-xl absolute bottom-4 left-4'>Go back to home</a></Link>
    </div>
  )
}

export default NotFound