import Literature from "../../../../globalSetups/database/model/literature"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log(req.query)
                const chapters = await Literature.find({book:req.query.book},'chapter')
                console.log(chapters)
                res.status(200).json(chapters)
                break;
        case 'POST':
                console.log(req.body)
                const payload = new Literature({
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
