const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    (errorMessage) ? console.log(errorMessage) : console.log(results.address); 
//chained the callbacks together
//getWeather takes results from geocodeAddress
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        (errorMessage) ? console.log(errorMessage) : 
        console.log(`The temperature is ${weatherResults.temperature}, but it feels like ${weatherResults.apparentTemperature}`); 
    });
});



