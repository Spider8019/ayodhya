import Blogs from "../../../globalSetups/database/model/blogs"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const findBy=req.query.id==="" ? {}: {createdBy:req.query.id}
                const books = await Blogs.find(findBy)
                console.log(books,findBy)
                res.status(200).json(books)
                break;
        case 'PUT':
                const payload={
                    heading:req.body.heading,
                    about:req.body.about,
                    tourismType:req.body.tourismType,
                    location:req.body.location,
                }
                const x=await Blogs.findOneAndUpdate({_id:req.body.id},payload)
                res.status(200).json(x)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
