const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fe24c8e1368285ebb3e50cffec543ae0&query=' + latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Cannot connect to weather service', undefined)
        } else if(response.body.error) {
            callback(response.body.error.info, undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            })
        }
    })

}

module.exports = forecast