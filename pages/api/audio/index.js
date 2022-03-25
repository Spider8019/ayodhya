import Gigs from "../../../globalSetups/database/model/gigs"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                let findBy={},sort={},limit=50,audioRelated=[]
                if(req.query.hasOwnProperty('about')){
                    findBy={...req.query,about:{$regex:req.query.about}}
                }
                if(req.query.hasOwnProperty('trending') && req.query.trending==='true'){
                    findBy={}
                    sort={view:-1}
                }
                if(req.query.hasOwnProperty('limit')){
                    limit=req.query.limit
                }
                if(req.query.hasOwnProperty('latest')){
                    findBy={}
                    sort={createdAt:-1}
                }

                const audios=await Gigs.find({...findBy,category:'music'}).populate('createdBy','name image availableImages').sort({...sort}).limit(limit)
                if(req.query.hasOwnProperty("showRelated") && req.query.showRelated==='true'){
                    const uniqArtists=_.uniq(audios.map(item=>item.createdBy.name))
                    audioRelated=await Gigs.find({about:{$not:{$regex: req.query.about ? req.query.about : "" }},category:'music'}).populate('createdBy','name image availableImages',{$in:{name:[uniqArtists]}})
                }
                
                res.status(200).json(_.concat(audios,audioRelated))
                break;

        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
