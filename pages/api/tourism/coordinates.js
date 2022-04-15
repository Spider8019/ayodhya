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
                const blogs = await Blogs.find({category:{$ne:null},longitude:{$ne:null},latitude:{$ne:null}},'heading longitude latitude tourismType location')
                res.status(200).json(blogs)
                break;

        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
