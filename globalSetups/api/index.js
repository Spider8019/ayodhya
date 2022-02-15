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

const callApiAndReturnDataGetMod = async(DATA,URL)=>{
    const response = await axios({
        method:"GET",
        url:defaultOptions.baseUrl+"/api/"+URL,
        params:DATA
    })
    if(response.status===200)
        return response.data
    else{
        return{error:"Unable To Fetch"}
    }
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
const callApiAndReturnDataDelete = async(DATA,URL)=>{
    const response = await axios({
        method:"DELETE",
        url:defaultOptions.baseUrl+"/api/"+URL,
        data:DATA
    })

    return response
}

// export const getProfile = (obj) => callApiAndReturnDataGet(obj,"profile")
export const signupProfile = (obj) => callApiAndReturnDataPost(obj,"must/signup/")
export const loginProfile = (obj) => callApiAndReturnDataPost(obj,"must/login/")
export const updateProfileImage = (obj) => callApiAndReturnDataPut(obj,'profile/detail/')
export const getProfileDetails = (obj) => callApiAndReturnDataGetMod(obj,"profile/detail/")
export const uploadPost = (obj) => callApiAndReturnDataPost(obj,"profile/posts/")
export const galleryPosts = (obj) => callApiAndReturnDataGetMod(obj,"profile/posts/")
export const markLikeAndDislike = (obj) => callApiAndReturnDataPut(obj,"profile/posts/")
export const getPostsOfProfile = (obj) => callApiAndReturnDataGet(obj,"profile/authposts/")
export const getGigsCount = (obj) => callApiAndReturnDataGet(obj,"count/")
export const postBlogs = (obj) => callApiAndReturnDataPost(obj,"tourism/blogs/")
export const getTourismBlogs = (obj) => callApiAndReturnDataGet(obj,"tourism/blogs/")
export const getSpecificBlog = (obj) => callApiAndReturnDataGet(obj,"tourism/specificBlog")
export const getSpecificGalleryPost = (obj) => callApiAndReturnDataGet(obj,"singleObj/gallery")
export const incrementView = (obj) => callApiAndReturnDataPut(obj,'singleObj/gallery')
export const getUniqueBooks = (obj) => callApiAndReturnDataGet(obj,"books/")
export const postLiteratureMaterial = (obj) => callApiAndReturnDataPost(obj,"books/")
export const getChaptersForABook = (obj) => callApiAndReturnDataGet(obj,'singleObj/getChapters/')
export const deleteLiteratureSpecific = (obj) => callApiAndReturnDataDelete(obj,'singleObj/getChapters/')
export const getLiteratureSideBar = (obj) => callApiAndReturnDataGet(obj,'books/getAllDetails/')
export const getSpecificLiteratureDetails = (obj) => callApiAndReturnDataGet(obj,'books/getAllDetailsOfSpecificLiterature/')
export const getContextForASpecificLiterature = (obj) => callApiAndReturnDataGet(obj,'singleObj/getContext/')
export const uploadProfilePicture = (obj) => callApiAndReturnDataPut(obj,'singleObj/profile/')
export const getTop10Talents = (obj) => callApiAndReturnDataGetMod(obj, 'talent/getTop10Artworks')
export const getAudios = (obj) => callApiAndReturnDataGetMod(obj,"audio/")
export const getRelatedGalleryPosts = (obj) => callApiAndReturnDataGetMod(obj,"singleObj/gallery/allRelatedObject")
export const getBlogs = (obj) => callApiAndReturnDataGetMod(obj,"blogs/")
