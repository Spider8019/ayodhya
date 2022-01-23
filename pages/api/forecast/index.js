import axios from "axios"

export default async function handler(req,res){
    const response=await axios({
        method:"GET",
        url:"https://api.openweathermap.org/data/2.5/weather",
        params:{
             id:"1278094",
            appid:"a58a699f89e61f3ecbfcfa7bc6860b8e"
        }
    })
    res.status(200).json(response.data)
}

//82.2lo26.8la