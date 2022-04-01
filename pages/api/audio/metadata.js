import Gigs from "../../../globalSetups/database/model/gigs"
import  _ from "lodash"
import mongoose from "mongoose"
const mutag = require('mutag');

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log("yoyoyoyoyoyoyoyoyoyoyoyo")
                mutag.fetch("https://ikshvaku-s3.s3.ap-south-1.amazonaws.com/spider8019L_dihmayz7.mp3").then((tags) => {
                    //get all tags
                    console.log(tags);
                  });
                res.status(200).json({msg:"getting metadata for audio"})
                break;

        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
