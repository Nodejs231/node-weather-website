const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })                                              here index.html reflects same

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Venkat'
    })
})

// app.get('/help', (req,res) =>{
//     res.send([{
//         name: 'Venkat',
//         age: 30
//     }, {
//         name: 'Yamini',
//         Prof: 'nursing'
//     }])
// })

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'help page',
        name: 'Venkat'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About page',
        name: 'Venkat'
    })
})

// app.get('/about', (req,res) =>{
//     res.send('<h1>About Page<h1>')
// })

app.get('/weather', (req,res) =>{
        if(!req.query.address) {
            return res.send({
                error: 'You must provide an address'
            })
        }
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error){
                return res.send( { error})
            }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send( { error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})    

// app.get('/products', (req,res) =>{            // its an example

//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req,res) => {
        res.render('404', {
            title: '404',
            name: 'Venkat',
            errorMessage: 'Help article not found'
        })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Venkat',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})