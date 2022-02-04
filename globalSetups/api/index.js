import axios from "axios"
import { defaultOptions } from "../availableArrays"

const callApiAndReturnDataGet = async(DATA,URL)=>{
    const response = await axios({
        method:"GET",
        url:defaultOptions.baseUrl+"/api/"+URL,
        params:DATA
    })
    
    return response
}
const callApiAndReturnDataPost = async(DATA,URL)=>{
    const response = await axios({
        method:"POST",
        url:defaultOptions.baseUrl+"/api/"+URL,
        data:DATA
    })

    return response
}
const callApiAndReturnDataPut = async(DATA,URL)=>{
    const response = await axios({
        method:"PUT",
        url:defaultOptions.baseUrl+"/api/"+URL,
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
export const markLikeAndDislike = (obj) => callApiAndReturnDataPut(obj,"profile/posts/")
export const getPostsOfProfile = (obj) => callApiAndReturnDataGet(obj,"profile/authposts/")
export const getGigsCount = (obj) => callApiAndReturnDataGet(obj,"count/")
export const postBlogs = (obj) => callApiAndReturnDataPost(obj,"tourism/blogs/")
export const getTourismBlogs = (obj) => callApiAndReturnDataGet(obj,"tourism/blogs/")
export const getSpecificBlog = (obj) => callApiAndReturnDataGet(obj,"tourism/specificBlog")