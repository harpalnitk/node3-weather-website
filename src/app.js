const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up Handle Bar engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        page_header: 'Weather Forecast',
        body: ''
    });
});
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Us',
        page_header: 'About Us',
        body: 'Body of about.html'
    });
});
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        page_header: 'Help',
        body: 'Body of help page'
    });
});


app.get('/weather', (req,res)=>{
if(!req.query.address){
    return res.send('Please provide an address');

}else {
    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if (error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData= {})=> {
            if(error){
                return res.send({error});
            }else {
                return res.send({
                    forecast: forecastData,
                    location:location,
                    address: req.query.address
                });
            }

        });
    });

}

});


app.get('/help/*', (req,res)=> {
    res.render('error', {
        title: 'About Us',
        page_header: 'About Us',
        errorMessage: 'Help Page not found'
    });
});


app.get('*', (req,res)=> {
    res.render('error', {
        title: 'About Us',
        page_header: 'About Us',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, ()=> {
    console.log(chalk.green.inverse('Server is running on port 3000!'));
})