import Calendar from "../../../globalSetups/database/model/Calendar"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

const d=new Date()
async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const books = await Calendar.findOne({date:req.query.date,month:d.getMonth(),year:d.getFullYear()})
                res.status(200).json(books)
                break;
        case 'POST':

                const payload = new Calendar({
                    ...req.body,
                    year:d.getFullYear()
                })
                console.log(await payload.save())
                res.status(200).json({msg:"Events Published Successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
