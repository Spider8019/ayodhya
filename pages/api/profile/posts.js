import Gigs from "../../../globalSetups/database/model/gigs"
import connection from "../../../globalSetups/database/connection"
import  _ from "lodash"
import mongoose from "mongoose"
import {getSession} from "next-auth/react"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log("get request")
                console.log(req.query)
                const gallery = await Gigs.find({category:{$ne:"music"}}).sort({createdAt:-1}).populate('createdBy').limit(50).skip(50*(req.query.page))
                res.status(200).json(gallery)
                break;
        case 'POST':
                const session=await getSession({req});
                console.log(typeof(req.body.location))
                const payload= new Gigs({
                    about:req.body.about,
                    category:req.body.category,
                    imageList:[req.body.location],
                    createdBy:session.user.id
                })
                console.log(await payload.save())
                res.status(200).json({msg:"Post created Successfully"})
                break;
        case 'PUT':
                console.log(req.body)
                const selectedGig=await Gigs.findOne({_id:req.body.gigId},{likedBy:1});
                console.log(selectedGig)
                if(selectedGig.likedBy.includes(req.body.likedBy)){
                    await Gigs.updateOne({_id:req.body.gigId},{$pull :{likedBy:req.body.likedBy}})
                }else{
                    await Gigs.updateOne({_id:req.body.gigId},{$push :{likedBy:req.body.likedBy}})
                }
                console.log("done successfully")
                res.status(200).json({msg:"Liked/Disliked Successfully"})
                break;
        case 'DELETE':
                await Gigs.deleteOne({_id:req.body.id})
                res.status(200).json({msg:"Deleted Successfully"})
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
// import useSWR from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.text())

// export default function Index() 
//   const { data, error } = useSWR('/api/cookies', fetcher)

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return <div>{`Cookie from response: "${data}"`}</div>
// }