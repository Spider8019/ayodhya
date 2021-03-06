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
    show:{
        type:Boolean,
        default:true,
    },
    location:{
        type:String,
        default:null
    },
    longitude:{
        type:Number,
        default:null,
    },
    latitude:{
        type:Number,
        default:null,
    },
    tourismType:{
        type:String,
        default:"-1"
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

