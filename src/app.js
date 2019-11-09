const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Setup paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Taus Grøtner'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Taus Grøtner'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Taus Grøtner',
        message: 'This is the help message and it is gonna help everyone that lands here'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geoCode(req.query.address, (error, {latitude:lat, longitude:long, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lat, long, (error, {textSummary:forecast})=> {
            if (error) {
                return res.send({error});
            }
            return res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    } 

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Taus Grøtner',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('help', {
        title: '404',
        name: 'Taus Grøtner',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is runnning on port 3000');
});