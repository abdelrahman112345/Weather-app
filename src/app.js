const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const forecast = require('./tools/forecast')
const geocode = require('./tools/geocode')
// Static files in Express
const path = require('path')
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
// Dynamic files in Express 
app.set('view engine', 'hbs')
app.get('/', (req, res) =>{
    res.render('index', {})
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'You must provide location'
        })
    }
    geocode(req.query.location,(geocodeError,data)=>{
        if(geocodeError){
            return res.send({error:geocodeError})
        }
        forecast(data.latitude,data.longtitude,(forecastError,dataForeCast)=>{
            if(forecastError){
                return res.send({error:forecastError})
            }
            res.send({
                temp: dataForeCast.temp,
                status: dataForeCast.status,
                country: req.query.location
            })
        })
    })
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})