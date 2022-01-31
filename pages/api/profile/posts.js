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
                const gallery = await Gigs.find({})
                res.status(200).json(gallery)
                break;
        case 'POST':
                const session=await getSession({req});
                const payload= new Gigs({
                    about:req.body.about,
                    category:req.body.category,
                    imageList:[req.body.location],
                    createdBy:session.user.id
                })
                console.log(await payload.save())
                res.status(200).json({msg:"Post created Successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
// import useSWR from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.text())

// export default function Index() {
//   const { data, error } = useSWR('/api/cookies', fetcher)

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return <div>{`Cookie from response: "${data}"`}</div>
// }