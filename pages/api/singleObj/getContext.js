import Literature from "../../../globalSetups/database/model/literature"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const context = await Literature.findOne({book:req.query.book,chapter:req.query.chapter},'aboutUrl chapter book')
                res.status(200).json(context)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
