import axios from "axios"

const callApiAndReturnDataGet = async(DATA,URL)=>{
    const response = await axios({
        method:"GET",
        url:"/api/"+URL,
        params:DATA
    })
    
    return response
}
const callApiAndReturnDataPost = async(DATA,URL)=>{
    const response = await axios({
        method:"POST",
        url:"/api/"+URL,
        data:DATA
    })

    return response
}

// export const getProfile = (obj) => callApiAndReturnDataGet(obj,"profile")
export const signupProfile = (obj) => callApiAndReturnDataPost(obj,"must/signup/")
export const loginProfile = (obj) => callApiAndReturnDataPost(obj,"must/login/")