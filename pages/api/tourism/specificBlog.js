import Blogs from "../../../globalSetups/database/model/blogs.js"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const blogs = await Blogs.findOne({_id:req.query.tourId}).populate('createdBy')
                res.status(200).json(blogs)
                break;
        case 'POST':
                console.log(req.body)
                const payload = new Blogs({
                    ...req.body
                })
                console.log(await payload.save())
                res.status(200).json({msg:"Blog Published Successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
