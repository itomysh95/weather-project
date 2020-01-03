const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// setup handlebars engine and views location
app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))



// setup static directory to serve
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Thomas Huang',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name: 'thomas',

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'this is some helpful text',
        title: 'help',
        name: 'Thomas Huang'
    })
}
)

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help article not found',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Error, need an address")
    }
    geocode(req.query.address,(error,{ latitude, longitude, location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error,{temp, precipProb}={})=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                temperature: temp,
                precip: precipProb,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'My 404 page',
    })
})

// app.com
// aapp.com/help
// app.com/about

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})