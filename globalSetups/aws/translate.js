import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId:"AKIAYRGQ44ZVC6BGZZ63",
    secretAccessKey:"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",
    region:"ap-south-1"
})

var translate=new AWS.Translate({
    accessKeyId:"AKIAYRGQ44ZVC6BGZZ63",
    secretAccessKey:"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"
})


export const translateTxt=async({text,TCode},callback)=>{
    let params={
        SourceLanguageCode:"en-US",
        TargetLanguageCode:'hi',
        Text:"yo yo honey singh"
    }
    // console.log(params,TCode)

    await translate.translateText(params,(err,data)=>{
    console.log(err,data,params)
    // console.log(err,data)
      callback(err,data)
    })
}
