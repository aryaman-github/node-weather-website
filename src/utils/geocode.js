const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJ5YW1hbjA1IiwiYSI6ImNranFyYXAxZjBreWYyemp4aGI3eHR2ZG0ifQ.wTY75SEp0ZefYNbXv71qQg'
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('cannot connect to geoLocation service!!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find Location, please try again', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode