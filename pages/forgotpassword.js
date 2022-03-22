import React from 'react'
import {forgotPassword } from "../globalSetups/api"

const Forgotpassword = () => {

  const [email,setEmail]=React.useState("")

  const checkForMail=async()=>{
        const response=await forgotPassword({email})
        alert(response)
        console.log(response)
  }
  return (
    <div>Forgotpassword

        <input type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        placeholder="Registered mail"
        />
        <button onClick={checkForMail} className='basicDarkButton'>Submit</button>
    </div>
  )
}

export default Forgotpassword