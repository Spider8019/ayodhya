import Literature from "../../../globalSetups/database/model/literature"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const query=JSON.parse(req.query.query)

                if(_.isEmpty(JSON.parse(req.query.query)))
                {
                    res.status(200).json({homepage:true})
                    return
                }
                const books = await Literature.findOne({book:query.book,chapter:query.chapter}).populate("createdBy")
                console.log(books)
                res.status(200).json({homepage:false,data:books})
                break;

        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
