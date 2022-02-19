import mongoose from "mongoose"
import bcrypt from "bcrypt"

const ProfileSchema = new mongoose.Schema({
    name:{
          type:String,
          required:[true, 'Name required'],
        },
    about:{
          type:String,
    },
    isVerified:{
          type:Boolean,
          default:false
    },
    isDeveloper:{
          type:Boolean,
          default:false
    },
    email:{
          type:String,
          required:[true, 'Email required'],
          unique:[true,'Not Unique'],
          lowercase:true,
          validate: {
            validator: function(v) {
                const reg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                return reg.test(v)
            },
            message: props => `${props.value} is not a valid email!`
          },
    },
    password:{
             type:String,
             required:[true,'Password Required']
            },
    image:{
        type:Number,
        default:0,
    },
    availableImages:{
            type:Array,
            "default":['https://ikshvaku-s3.s3.ap-south-1.amazonaws.com/static/images.png','https://ikshvaku-s3.s3.ap-south-1.amazonaws.com/static/1a3ea756b8ec93542184c8bb4631205e.jpg','/static/preview.png']
    },
    coverImage:String,
    aadhar:String,
})

ProfileSchema.pre("save",async function(next) {
    if (this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10)
    }
    next();
});

module.exports =
    mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

