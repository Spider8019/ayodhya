import React,{useState} from 'react';
import {signupProfile} from "../globalSetups/api"

const Signup = () => {
  const [formObj,setFormObj]=useState({name:"",email:"",password:"",coverImage:""})

  const handleSignup = async (e) =>{
     e.preventDefault()
     const response = await signupProfile(formObj)
     console.log(response)
  }

  return <div>
      <form onSubmit={handleSignup}>
          <input 
            type="text"
            placeholder='Name'
            value={formObj.name}
            onChange={e=>setFormObj({...formObj,name:e.target.value})}
          />
          <input
            type="email"
            placeholder='Email'
            value={formObj.email}
            onChange={e=>setFormObj({...formObj,email:e.target.value})}
          />
          <input
            type="password"
            placeholder='Password'
            value={formObj.password}
            onChange={e=>setFormObj({...formObj,password:e.target.value})}
          />
          <input
            type="text"
            placeholder='Cover Image'
            value={formObj.coverImage}
            onChange={e=>setFormObj({...formObj,coverImage:e.target.value})}
          />
          <button type="submit">Signup</button>
      </form>
  </div>;
};

export default Signup;
