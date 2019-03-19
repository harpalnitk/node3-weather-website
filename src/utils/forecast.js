const request= require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a321258faa8fad699397e93f07a6efff/'+latitude+','+longitude+'?units=si';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather Service!!', undefined);
        }else if(body.error){
            callback(('Unable to find location'),undefined);
        }
        else{
            callback(undefined, body.daily.data[0].summary +' Current temperature is '+body.currently.temperature+" degrees out. The high today is "+ body.daily.data[0].temperatureHigh +". The Low today is "+ body.daily.data[0].temperatureLow +". There is " + body.currently.precipProbability+ ' percent probability of rain');

        }
    });
}

module.exports= forecast;