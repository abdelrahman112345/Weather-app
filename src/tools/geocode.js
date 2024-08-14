// Install Request Module
const request = require('request')
//Parameter
const geocode = (location, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw`
    request({url:geocodeUrl, json:true}, (err, res) => {
        if(err) {
            callback('Error has occurred', undefined)
        } else if (res.body.message) {
            callback(res.body.message, undefined)
        } else if (res.body.features.length == 0 ) {
            callback('Please, Enter country name', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longtitude: res.body.features[0].center[0]
            })
        }
    })
}
module.exports = geocode