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
        url:String
    }],
    likedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile
    }],
    dislikedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile
    }],
    createdBy:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:Profile
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    lastUpdatedAt:{
        type:Date
    },

})

module.exports =
    mongoose.models.Gigs || mongoose.model('Gigs', GigsSchema);

