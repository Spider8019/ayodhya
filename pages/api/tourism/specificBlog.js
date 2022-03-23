import Blogs from "../../../globalSetups/database/model/blogs.js"
import  _ from "lodash"
import mongoose from "mongoose"
import axios from "axios"
import {translateTxt} from "../../../globalSetups/aws/translate"

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
                const payload = new Blogs({
                    ...req.body
                })
                console.log(await payload.save())
                res.status(200).json({msg:"Blog Published Successfully"})
                break;
        case 'PUT':
                const selectedGig=await Blogs.findOne({_id:req.body.gigId},{likedBy:1});
                console.log(selectedGig)
                if(selectedGig.likedBy.includes(req.body.likedBy)){
                    await Blogs.updateOne({_id:req.body.gigId},{$pull :{likedBy:req.body.likedBy}})
                }else{
                    await Blogs.updateOne({_id:req.body.gigId},{$push :{likedBy:req.body.likedBy}})
                }
                console.log("done successfully")
                res.status(200).json({msg:"Liked/Disliked Successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
