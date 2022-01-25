import Profile from "../../../globalSetups/database/model/profile"
import mongoose from "mongoose"
import  _ from "lodash"
import bcrypt from "bcrypt"

mongoose.connect("mongodb://localhost:27017/ikshvakuDB")
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

export default async function handler(req, res) {
    switch(req.method){
        case 'POST':
                const findByEmail=await Profile.findOne({email:req.body.email})
                if(!_.isNull(findByEmail)){
                    const checkPasswordMatch=await bcrypt.compare(req.body.password, findByEmail.password)
                    if(checkPasswordMatch){
                        const token = await findByEmail.generateAuthToken()
                        console.log("aman the king")
                        console.log(token)
                        return res.status(200).json({msg:"User logged in success"})
                    }    
                }
                res.status(200).json({error:"There is no user with given credentials"})

                break;
        default:
                res.status(400).json({ success: false })
                break
    }
    // if(req.method==="POST"){
    //     console.log(req.body)

    // }
    res.status(200).json({ name: 'John Doe' })
}
  