import AWS from "aws-sdk"
import {nanoid} from "nanoid"
import _ from "lodash"

AWS.config.update({
    accessKeyId:"AKIAYRGQ44ZVC6BGZZ63",
    secretAccessKey:"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"
})

const myBucket = new AWS.S3({
    params: { Bucket:"ikshvaku-s3"},
    region: "ap-south-1",
})

export const uploadObject = async({file},callback) =>{

    console.log("spider8019_"+nanoid()+file.name)
    const params={
        ACL: 'public-read',
        Body: file,
        Bucket:"ikshvaku-s3",
        Key: "spider8019"+nanoid()+file.name
    }
    await myBucket.upload(params)
    .on('httpUploadProgress', (evt) => {
        return (Math.round((evt.loaded / evt.total) * 100))
    })
    .send((err,data) => {
        callback(err,data)
    })
}