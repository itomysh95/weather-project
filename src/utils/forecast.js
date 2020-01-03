const request = require('request')


const forecast = (lat,lon,callback)=>{
    
    const url = "https://api.darksky.net/forecast/3b69b4571a67c55e2da811a2ce65fbb4/"+encodeURIComponent(lat)+","+encodeURIComponent(lon)+""
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to find location services!",undefined)
        }
        else if(body.error){
            callback('longitude and/or latitude are incorrect!',undefined)
        }
        else{
            console.log(body)
            callback(undefined,{
                temp : body.currently.temperature,
                precipProb : body.currently.precipProbability,
                summary: body.daily.summary
            })
        }
    })


}



module.exports = forecast