import mongoose from "mongoose"
import Profile from "./profile"

const LiteratureSchema = new mongoose.Schema({
    book:{
          type:String,
          required:[true, 'Name required'],
    },
    chapter:{
        type:String,
    },
    aboutUrlKey:{
        type:String,
    },
    aboutUrl:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile
    }
})

module.exports =
    mongoose.models.Literature || mongoose.model('Literature', LiteratureSchema);

