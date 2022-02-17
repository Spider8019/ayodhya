import Gigs from "../../../globalSetups/database/model/gigs"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const top10 =await Gigs.aggregate(
                    [
                        {"$match":{category:req.query.category}},
                        { "$project": {
                            "about": 1,
                            "category": 1,
                            "imageList":1,
                            "view": 1,
                            "likedBy": 1,
                            "createdBy":1,
                            "createdAt":1,
                            "length": { "likedBy":{"$size": "$likedBy" }}
                        }},
                        { "$sort": { "length": -1 } },
                        { "$limit": 10 }
                    ]
                )
                res.status(200).json(top10)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
