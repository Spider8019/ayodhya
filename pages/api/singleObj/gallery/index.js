import Gigs from "../../../../globalSetups/database/model/gigs.js"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const blogs = await Gigs.findOne({_id:req.query.gigId}).populate('createdBy')
                console.log(blogs)
                res.status(200).json(blogs)
                break;
        case 'PUT':
                console.log(req.body)
                const gigs = await Gigs.updateOne({_id:req.body.gigId},{$inc : {view:1}})
                console.log(gigs)
                res.status(200).json({msg:"View Incremented By One"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
