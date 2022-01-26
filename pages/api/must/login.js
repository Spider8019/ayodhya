import Profile from "../../../globalSetups/database/model/profile"
import connection from "../../../globalSetups/database/connection"
import  _ from "lodash"
import bcrypt from "bcrypt"
import mongoose from "mongoose"


mongoose.connect("mongodb://localhost:27017/ikshvakuDB")
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'POST':
                const findByEmail=await Profile.findOne({email:req.body.email})
                if(!_.isNull(findByEmail)){
                    const checkPasswordMatch=await bcrypt.compare(req.body.password, findByEmail.password)
                    if(checkPasswordMatch){
                        const token = await findByEmail.generateAuthToken()
                        return res.status(200).json({msg:"User logged in success"})
                    }    
                }
                res.status(200).json({error:"There is no user with given credentials"})

                break;
        default:
                res.status(400).json({ success: false })
                break
    }
    res.status(200).json({ name: 'John Doe' })
}
  
export default handler
// import useSWR from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.text())

// export default function Index() {
//   const { data, error } = useSWR('/api/cookies', fetcher)

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return <div>{`Cookie from response: "${data}"`}</div>
// }