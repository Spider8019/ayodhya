import axios from "axios"

const callApiAndReturnDataGet = async(DATA,URL)=>{
    const response = await axios({
        method:"GET",
        url:"http://localhost:3000/api/"+URL,
        params:DATA
    })
    
    return response
}
const callApiAndReturnDataPost = async(DATA,URL)=>{
    const response = await axios({
        method:"POST",
        url:"http://localhost:3000/api/"+URL,
        data:DATA
    })

    return response
}

// export const getProfile = (obj) => callApiAndReturnDataGet(obj,"profile")
export const signupProfile = (obj) => callApiAndReturnDataPost(obj,"must/signup/")
export const loginProfile = (obj) => callApiAndReturnDataPost(obj,"must/login/")
export const getProfileDetails = (obj) => callApiAndReturnDataGet(obj,"profile/detail/")
export const uploadPost = (obj) => callApiAndReturnDataPost(obj,"profile/posts/")
export const galleryPosts = (obj) => callApiAndReturnDataGet(obj,"profile/posts/")