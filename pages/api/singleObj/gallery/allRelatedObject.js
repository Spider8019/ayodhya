import Gigs from "../../../../globalSetups/database/model/gigs.js"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log(req.query.date)
                const gigs = await Gigs.find({category:{$ne:"music"},_id:{$ne:req.query.notId},createdAt:{$gte:new Date(Date.parse(req.query.date)-864000000),$lte:new Date(Date.parse(req.query.date)+864000000)}}).populate('createdBy','name image availableImages').limit(25)
                res.status(200).json(gigs)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
