// Install Request Module
const request = require('request')
// Parameter
const forecast = (latitude, longtitude, callback) => {
    // API Key 
    const url = `http://api.weatherapi.com/v1/current.json?key=51a20bc2793045b6b26142621220803&q=${latitude},${longtitude}`
    // Request Function 
    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Error has occurred', undefined)
        } else if (res.body.error) {
            callback(res.body.error.message, undefined)
        } else {
            callback(undefined, {
                temp: res.body.current.temp_c,
                status: res.body.current.condition.text,
                country: res.body.location.country
            })
        }
    })
}
module.exports = forecast