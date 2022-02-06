import Literature from "../../../globalSetups/database/model/literature"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const books = await Literature.find({},'book chapter')
                const valueNeeded=_.map(_.uniq(_.map(books,(item)=>item.book)),(item)=>{
                    return{
                        book:item,
                        chapters:_.filter(books,(book)=>{
                            if(item===book.book && book.chapter!==""){
                                return {chapter:book.chapter}
                            }
                        })}
                    }
                )
                // console.log(valueNeeded)
                res.status(200).json(valueNeeded)
                break;
        case 'POST':
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
