import Profile from "./profile"
import mongoose from "mongoose"

const GigsSchema = new mongoose.Schema({
    about:{
        type:String,
    },
    category:{
        type:String
    },
    imageList:[{
        type:String
    }],
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
        default:[]
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
    mongoose.models.Gigs || mongoose.model('Gigs', GigsSchema);

