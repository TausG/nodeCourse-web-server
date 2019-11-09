const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGF1c2ciLCJhIjoiY2syMjFqYXJ4MDQyaDNucGRmZWJ2NjRqdCJ9.mcJYNRHfALgBCMge7i35oQ&limit=1';
    request({url, json:true}, (error, {body:response}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(response.features.length === 0){
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude : response.features[0].center[1],
                longitude : response.features[0].center[0],
                location : response.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;

// const searchString = 'Los Angeles';

// const mapBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchString + '.json';

// const mapQueryString = '?access_token=pk.eyJ1IjoidGF1c2ciLCJhIjoiY2syMjFqYXJ4MDQyaDNucGRmZWJ2NjRqdCJ9.mcJYNRHfALgBCMge7i35oQ&limit=1';

// const mapUrl = mapBaseUrl + mapQueryString;

// request({url:mapUrl, json: true}, (error,response) => {
//     if(error) {
//         console.log('Unable to connect to geocoding service');
//     } else if(response.body.features.length === 0) {
//         console.log('Unable to find location');
//     } else {
//         const lat = response.body.features[0].center[1];
//         const long = response.body.features[0].center[0];
//         console.log('Lat is ' + lat + ', long is ' + long);
//     }
// });
