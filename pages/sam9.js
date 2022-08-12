import React, { useState } from 'react';
import { signupProfile } from "../globalSetups/api"
import { useRouter } from "next/router"
import { notifyerror } from "../components/snackbar"
import Head from 'next/head';

const Signup = () => {
  const [formObj, setFormObj] = useState({ name: "", email: "", password: "", coverImage: "https://ikshvakubucket.s3.ap-south-1.amazonaws.com/Beige+Minimalist+Happy+Chuseok+Korean+Mid+Autumn+Moon+Festival+Twitter+Header.png" })
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    const response = await signupProfile(formObj)
    console.log(response)
    if (response.status === 201) {
      router.replace("/dashboard")
    }
    else {
      notifyerror('Signup went wrong.')
    }
  }

  return <div className="p-20">
    <Head>
      <title>
        Signup - Ikshvaku
      </title>
    </Head>
    <form
      className="grid grid-cols-1"
      onSubmit={handleSignup}>
      <input
        type="text"
        className="m-2 bg-amber-50 p-2"
        placeholder='Name'
        value={formObj.name}
        onChange={e => setFormObj({ ...formObj, name: e.target.value })}
      />
      <input
        type="email"
        className="m-2 bg-amber-50 p-2"

        placeholder='Email'
        value={formObj.email}
        onChange={e => setFormObj({ ...formObj, email: e.target.value })}
      />
      <input
        type="password"
        className=" m-2 bg-amber-50 p-2"
        placeholder='Password'
        value={formObj.password}
        onChange={e => setFormObj({ ...formObj, password: e.target.value })}
      />
      <input
        type="text"
        className="hidden"
        placeholder='Cover Image'
        value={formObj.coverImage}
        onChange={e => setFormObj({ ...formObj, coverImage: e.target.value })}
      />
      <button className="basicButton m-2" type="submit">Signup</button>
    </form>
  </div>;
};

export default Signup;
