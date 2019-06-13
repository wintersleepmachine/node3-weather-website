const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)




app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jesse Kim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jesse Kim'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Hi there, how may I help you?',
        title: 'Help',
        name: 'Jesse Kim'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {lat, lng, place} = {}) => {
        if(err){
            return res.send({error: err})
        }


        forecast(lat, lng, (err, weather) => {
            if(err){
                return res.send({error: err})
            }

            res.send({
                location: place,
                weather,
                address: req.query.address
            })
        })
    })

})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: '404 Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up!')
})