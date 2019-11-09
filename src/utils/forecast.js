const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/b71a1bdca4e5f8210e492d1c57866151/' + lat + ',' + long + '?units=si';
    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined);
        } else {
            callback(undefined, {
                temperature : body.currently.temperature,
                precipProbability : body.currently.precipProbability,
                summary : body.daily.data[0].summary,
                textSummary : body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            });
        }
    });
};

module.exports = forecast;

// const apiKey = 'b71a1bdca4e5f8210e492d1c57866151';
// const baseUrl = 'https://api.darksky.net/forecast/b71a1bdca4e5f8210e492d1c57866151/37.8267,-122.4233';
// const queryString = '?units=si&lang=da'

// const url = baseUrl + queryString;



// request({url: url, json: true}, (error, response) => {

//     if(error){
//         console.log('Unable to connect to weather service');
//     }else if(response.body.error){
//         console.log('Unable to find location');
//     }
//     else{
//         const currentTemp = response.body.currently.temperature;
//         const precipProba = response.body.currently.precipProbability;
    
//         const summaryForToday = response.body.daily.data[0].summary;
    
//         console.log(summaryForToday + ' It is currently ' + currentTemp + ' degress out. There is a ' + precipProba + '% chance of rain.');    
//     }
// });