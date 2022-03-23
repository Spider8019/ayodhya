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


export const translateTxt=({text,TCode})=>{
    console.log(text)
    let params={
        SourceLanguageCode:"en-US",
        TargetLanguageCode:'hi',
        Text:"guru randhawa"
    }
    // console.log(params,TCode)

    translate.translateText(params,(err,data)=>{
    console.log(err,data.TranslatedText)

    if(err) return err
    console.log('step1')
      return data.TranslatedText
    })
}
