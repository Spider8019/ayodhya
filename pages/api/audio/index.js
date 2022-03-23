import Gigs from "../../../globalSetups/database/model/gigs"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                let findBy={}
                if(req.query.hasOwnProperty('about')){
                    findBy={...req.query,about:{$regex:req.query.about}}
                }
                
                const audios=await Gigs.find({...findBy,category:'music'}).populate('createdBy','name image availableImages')
                const uniqArtists=_.uniq(audios.map(item=>item.createdBy.name))
                const audioRelated=await Gigs.find({about:{$not:{$regex: req.query.about ? req.query.about : "" }},category:'music'}).populate('createdBy','name image availableImages',{$in:{name:[uniqArtists]}})
                res.status(200).json(_.concat(audios,audioRelated))
                break;

        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
