import Profile from "./profile"
import mongoose from "mongoose"

const BlogsSchema = new mongoose.Schema({
    heading:{
        type:String,
    },
    about:{
        type:String,
    },
    category:{
        type:String
    },
    location:{
        type:String,
        default:null
    },
    tourismType:{
        type:String,
        default:null
    },
    likedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile
    }],
    dislikedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile,
        default:[]
    }],
    createdBy:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    lastUpdatedAt:{
        type:Date,
        default:Date.now
    },

})

module.exports =
    mongoose.models.Blogs || mongoose.model('Blogs', BlogsSchema);

