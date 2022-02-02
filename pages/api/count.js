import Gigs from "../../globalSetups/database/model/gigs"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const gallery = await Gigs.find({}).count()
                res.status(200).json(gallery)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
