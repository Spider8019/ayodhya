import Blogs from "../../../globalSetups/database/model/blogs.js"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log(req.query)
                let payloadGet={}
                let findGet={
                    $project: {
                       heading: 1,
                       location: 1,
                       tourismType: 1,
                       totalLikes: { $cond: { if: { $isArray: "$likedBy" }, then: { $size: "$likedBy" }, else: "NA"} }
                    }
                 }
                switch(req.query.query){
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '0':payloadGet={...payloadGet,tourismType:req.query.query}
                             break;
                    case 'personal':payloadGet={location:{ $eq: "" }}
                             break;
                    case 'any':payloadGet={location:{ $ne: "" }}
                             break;
                }
                console.log(payloadGet)
                const blogs= await Blogs.aggregate([{$match:{...payloadGet}},findGet,{$limit:50}])
                // console.log(x)
                // const blogs = await Blogs.find(payloadGet,'heading location tourismType').limit(50)
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
