import mongoose from "mongoose"
import bcrypt from "bcrypt"

const ProfileSchema = new mongoose.Schema({
    name:{
          type:String,
          required:[true, 'Name required'],
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
    url:String,
    aadhar:String,
    tokens:[{
        token:{
            type:String,
            required:true
        },
        accessOn:String
    }],
})

ProfileSchema.pre("save",async function(next) {
    if (this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10)
    }
    next();
});

module.exports =
    mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

