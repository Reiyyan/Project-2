const axios = require('axios');
const apiKey = "cb7ef31394277244cd5e85470fac63bb";
// const city = "Toronto";

const torontoData = {
    "data": {
        "coord": {
            "lon": -79.4163,
            "lat": 43.7001
        },
        "weather": [
            {
                "id": 600,
                "main": "Snow",
                "description": "light snow",
                "icon": "13n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": -1.6,
            "feels_like": -5.51,
            "temp_min": -1.6,
            "temp_max": -1.6,
            "pressure": 1010,
            "humidity": 86
        },
        "visibility": 9656,
        "wind": {
            "speed": 3.09,
            "deg": 60
        },
        "clouds": {
            "all": 90
        },
        "dt": 1638083148,
        "sys": {
            "type": 1,
            "id": 941,
            "country": "CA",
            "sunrise": 1638102510,
            "sunset": 1638135802
        },
        "timezone": -18000,
        "id": 6167865,
        "name": "Toronto",
        "cod": 200
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "462",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=cb7ef31394277244cd5e85470fac63bb&units=metric"
    },
    "request": {}
}

const data2 = {
    "data": {
        "coord": {
            "lon": -79.4163,
            "lat": 43.7001
        },
        "weather": [
            {
                "id": 600,
                "main": "Snow",
                "description": "light snow",
                "icon": "13n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": -1.53,
            "feels_like": -7.21,
            "temp_min": -2.46,
            "temp_max": 0.46,
            "pressure": 1010,
            "humidity": 86
        },
        "visibility": 10000,
        "wind": {
            "speed": 5.66,
            "deg": 40,
            "gust": 8.23
        },
        "snow": {
            "1h": 0.22
        },
        "clouds": {
            "all": 90
        },
        "dt": 1638151085,
        "sys": {
            "type": 1,
            "id": 718,
            "country": "CA",
            "sunrise": 1638102510,
            "sunset": 1638135802
        },
        "timezone": -18000,
        "id": 6167865,
        "name": "Toronto",
        "cod": 200
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "496",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=cb7ef31394277244cd5e85470fac63bb&units=metric"
    },
    "request": {}
}
// Make a request for a user with a given ID
export async function getWeather(city) {
    // https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=cb7ef31394277244cd5e85470fac63bb&units=metric
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        })

    // let response = data2;

    return response;
}