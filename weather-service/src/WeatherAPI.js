const axios = require('axios');
const apiKey = "cb7ef31394277244cd5e85470fac63bb";

export async function getWeather(city) {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        })

    return response;
}