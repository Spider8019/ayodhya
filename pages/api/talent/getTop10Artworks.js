import Gigs from "../../../globalSetups/database/model/gigs"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                // const blogs = await Gigs.find({category:"artwork"}).sort({likedB})
                const blogs = Gigs.aggregate(
                    [
                        {"$match":{category:"artworks"}},
                        { "$project": {
                            "about": 1,
                            "category": 1,
                            "imageList":1,
                            "view": 1,
                            "likedBy": 1,
                            "dislikedBy": 1,
                            "createdBy":1,
                            "createdAt":1,
                            "length": { "likedBy":{"$size": "$answers" }}
                        }},
                        { "$sort": { "length": -1 } },
                        { "$limit": 10 }
                    ]
                )
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
