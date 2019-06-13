const request = require('request')

const geocode = (address, callback) => {
    const key = 'pk.eyJ1Ijoid2ludGVyc2xlZXBtYWNoaW5lIiwiYSI6ImNqdzdlOWR4MzJkZHozeXFxamdvcXBvbDMifQ.DyKdmbEUr22A3WnxDv_CsA'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}`
    request({
        url,
        json:true
    }, (err, {body}) => {
        if(err) {
            callback('Unable to connect to location services')
        }else if(!body.features.length){
            callback('Unable to find location, please make sure location is spelled correctly and try another search.')
        }else {
            const lat = body.features[0].center[1]
            const lng = body.features[0].center[0]
            const place = body.features[0].place_name

            callback(null, {lat, lng, place})
        }
    })

}   

module.exports = geocode