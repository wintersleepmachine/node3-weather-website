const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/80c6c754465a0a3a359356dbb9be865c/${lat},${lng}?units=si`
    request({url, json:true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to location services')
        }else if(body.error){
            callback('Unable to find weather, please try again')
        }else {
            const {summary} = body.currently
            const {temperature} = body.currently

            const weather = `It is currently ${summary.toLowerCase()}. The temperature is ${temperature}.`
            callback(null, weather)
        }
    })
}


module.exports = forecast