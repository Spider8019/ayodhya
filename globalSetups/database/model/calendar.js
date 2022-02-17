import mongoose from "mongoose"

const CalendarSchema = new mongoose.Schema({
    date:{
        type:Number,
    },
    month:{
        type:Number,
        default:new Date().getMonth(),
    },
    year:{
        type:Number,
    },
    heading:{
        type:String,
        default:null
    },
    about:{
        type:String,
        default:null
    },
    imgUrl:{
        type:String,
        required:true,
    }
})

module.exports =
    mongoose.models.Calendar || mongoose.model('Calendar', CalendarSchema);

