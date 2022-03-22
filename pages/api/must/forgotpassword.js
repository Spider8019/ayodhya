import Profile from "../../../globalSetups/database/model/profile"
import  _ from "lodash"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {defaultOptions} from "../../../globalSetups/availableArrays"
const sgMail = require('@sendgrid/mail');

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

const JWT_SECRET="HELLO EVERYBODY, GURU RANDHAWA IS ON THIS SIDE"
//2505 2080 4822 9
async function handler(req, res) {
    switch(req.method){
        case 'POST':
                const findByEmail=await Profile.findOne({email:req.body.email})
                console.log(findByEmail)
                if(_.isNull(findByEmail))
                    {
                        res.status(200).json({error:"There is no user with given credentials"})
                        return
                    }
                
                const secret=JWT_SECRET+findByEmail.password
                const paylaod={email:findByEmail.email,id:findByEmail._id}
                const token=jwt.sign(payload,secret,{expiresIn:"15m"})
                const link=defaultOptions.baseUrl+"/reset-password/"+payload.id+"/"+token;
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                to: 'test@example.com',
                from: 'test@example.com',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                };
                sgMail.send(msg);
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
