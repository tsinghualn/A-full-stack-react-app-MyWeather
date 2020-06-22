const request = require('request-promise');

const API_KEY = '2f2eebdec950e4ba07f24b23dd1f2270';
require('dotenv').config(); // need to install: npm install dotenv

class Weather {
  static retrieveByCity (city , callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`, // the actural end point where the data is extracted from
      json: true
    }).then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
      callback({ error: 'Could not reach OpenWeatherMap API.' });
    });
  }
}

module.exports = Weather;

// The reason to keep data access in api folder and model folder is to keep some clear logical boundaries between moving data
// at the root, our backend run our main index.js, then we register api end point, which can be reached to url, the api end point then
// use the model to get the data
