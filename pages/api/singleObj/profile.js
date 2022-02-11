import Profile from "../../../globalSetups/database/model/profile"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'PUT':
                console.log(req.body)
                const context = await Profile.updateOne({_id:req.body.id},{$push:{availableImages:{$each:[req.body.location],$position:-1}}})
                res.status(200).json(context)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
