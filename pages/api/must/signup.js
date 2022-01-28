import mongoose from "mongoose"
import Profile from "../../../globalSetups/database/model/profile"


mongoose.connect("mongodb://localhost:27017/ikshvakuDB")
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))


export default async function profile(req,res){
  console.log(req.method)
  switch (req.method) {
    case 'GET':
      try {
        // const users = await User.find({})
        res.status(200).json({ success: true, data: "users" })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const newObj=new Profile({...req.body,about:"",image:"https://www.trueshayari.in/wp-content/uploads/2019/11/Attitude-Pic-of-Ram-Ji-Bhagwan.jpg",aadhar:"1111 1111 1111"})
        await newObj.save()
        res.status(201).json({ success: true, data: "User Created Successfully" })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false,error:error })
      }
      break
    default:
      console.log(req.method)
      res.status(400).json({ success: false })
      break
  }
}