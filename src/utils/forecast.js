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
            const {precipProbability} = body.currently
            const todaysData = body.daily.data[0]

            const weather = `It is currently ${summary.toLowerCase()}. The temperature is ${temperature}. There is a ${precipProbability}% change of rain.
            The high and low temperature for today is ${todaysData.temperatureHigh} and ${todaysData.temperatureLow}, respectively`
            callback(null, weather)
        }
    })
}


module.exports = forecast