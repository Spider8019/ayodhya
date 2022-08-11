import AWS from "aws-sdk"
import { nanoid } from "nanoid"
import _ from "lodash"

AWS.config.update({
    accessKeyId: "AKIAYRGQ44ZVBPYEUFW5",
    secretAccessKey: "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"
})

const myBucket = new AWS.S3({
    params: { Bucket: "ikshvakubucket" },
    region: "ap-south-1",
})

export const uploadObject = async ({ file, filename }, callback) => {

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: "ikshvakubucket",
        Key: filename
    }
    await myBucket.upload(params)
        .on('httpUploadProgress', (evt) => {
            return (Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err, data) => {
            callback(err, data)
        })
}
export const deleteObject = async ({ url }, callback) => {

    // https://ikshvaku-s3.s3.ap-south-1.amazonaws.com/spider80194bbiek3i8FEXKjl_h6R33b7df2cb6b36abfc7c7b93d1670d7946a.jpg
    const params = {
        Bucket: "ikshvakubucket",
        Key: url.slice(48,)
    }
    console.log(params)
    await myBucket.deleteObject(params)
        .send((err, data) => {
            callback(err, data)
        })
}