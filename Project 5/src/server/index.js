var path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const FormData = require("form-data");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const axios = require('axios/dist/node/axios.cjs');
// const axios = require('axios');
// import axios from './lib/axios.js';

const mockAPIResponse = require('./mockAPI.js')


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

  const getLocation = (req, res) => {
    const url = 'https://api.weatherbit.io/v2.0/forecast/hourly?city=' + req.body.inputText +'&key=' + process.env.API_WEATHER_KEY;
    axios
      .post(url)
      .then(function (response) {
        // handle success
        console.log('consolog data location', response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        res.json(error);
      })
      .finally(function () {
        // always executed
      });
    }
    app.post("/getLocation", getLocation);

    const getWeather = (req, res) => {
      const url = 'https://api.weatherbit.io/v2.0/forecast/agweather?lat='+req.body.lat+'&lon='+req.body.lon+'&key='+process.env.API_WEATHER_KEY;
      axios
        .post(url)
        .then(function (response) {
          // handle success
          // console.log('consolog data weather', response.data);
          console.log( req.body.lat);
          res.json(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          res.json(error);
        })
        .finally(function () {
          // always executed
        });
    };
    app.post("/getWeather", getWeather);

    const getPhoto = (req, res) => {
      const url = 'https://pixabay.com/api/?key='+ process.env.key +'&q=' + req.body.inputText ;
      axios
        .post(url)
        .then(function (response) {
          // handle success
          console.log('consolog data photo', response.data);
          res.json(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          res.json(error);
        })
        .finally(function () {
          // always executed
        });
    };
    app.post("/getPhoto", getPhoto);
