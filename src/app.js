const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to use
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aryaman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aryaman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Aryaman'
    })
})
// app.get('', (req, res) => {
//     res.send('Hello Express!!')
// })
// app.get('/help', (req, res) => {
//     res.send('Help!!')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
         return res.send({
            error: 'You must provide address to get weather'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //using destructuring for 
        if(error) {                                                        //response object
            return res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                } else {
                    res.send({
                        location: location,
                        temperature: forecastData.temperature,
                        feelsLike: forecastData.feelsLike
                    })
                    // console.log('Location: ', location)
                    // console.log('Temperature : ', forecastData.temperature)
                    // console.log('Feels Like: ', forecastData.feelsLike)
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Aryaman'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Aryaman'
    })
})

app.listen(3000, () => {
    console.log('server is listening on 3000')
})