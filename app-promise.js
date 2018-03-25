const yargs = require('yargs');
const axios = require('axios');

// object that stores the final parsed output
const argv = yargs
    .options({
        a: {
            //demand = need an address to fetch the weather for
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            //string always parses 'a' as a string
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;//takes all of options and stores in in argv variable

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&AIzaSyDWXwPb0pX8yxNBjIsKPHeKI2Hf9LrvdtM`;

//no need to add JSON to argument, axios already knows how to parse it
//axios get method returns a promise
// so we can access it directly using then
//use then once to get geolocation data, print the data to the screen
//then we return another promise, where we make a request for the weather
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error ('Unable to find that address.');
    }

    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/1cfa8877cf78a0b3c9404877193c3b26/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}, but it feels like ${apparentTemperature}`);
}).catch((e) => {
   if (e.code === 'ENOTFOUND') {
       console.log('Unable to connect to API servers.');
   } else {
       console.log(e.message);
   }
});



