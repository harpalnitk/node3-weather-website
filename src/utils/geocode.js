const request = require('request');
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFycGFsbml0ayIsImEiOiJjanRlZGV2d3MxZGFpNDNwOGNtYTNrYjVvIn0.hH3NDFj-oL4W3eU3gxov2Q&limit=1'
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGFycGFsbml0ayIsImEiOiJjanRlZGV2d3MxZGFpNDNwOGNtYTNrYjVvIn0.hH3NDFj-oL4W3eU3gxov2Q&limit=1'
//

// limit returns number of search results matching the address.Default is 5 and max is 10
// we are using only one search result

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location services!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search.')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
// });