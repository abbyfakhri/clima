const http = require('http');
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
    
})

app.use(express.json());

const axiosHeader = 
    {
        "Transfer-Encoding": "chunked",
        "Connection": "keep-alive",
        "Vary": "Accept-Encoding",
        "CDN-PullZone": "93447",
        "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
        "CDN-RequestCountryCode": "GB",
        "CDN-ProxyVer": "1.03",
        "CDN-RequestPullSuccess": "True",
        "CDN-RequestPullCode": "200",
        "CDN-CachedAt": "01/11/2023 13:33:51",
        "CDN-EdgeStorageId": "951",
        "CDN-Status": "200",
        "CDN-RequestId": "9e86a771b567093e160df085e38f1cac",
        "CDN-Cache": "EXPIRED",
        "Cache-Control": "public, max-age=180",
        "Content-Type": "application/json",
        "Date": "Wed, 11 Jan 2023 13:33:51 GMT",
        "Server": "BunnyCDN-FR1-946"
      }
  

const getPublicIp = ()=>{
    return new Promise (resolve =>{

            axios.get('https://api.ipify.org')
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    })
}

const getLocation = (publicIP)=>{

    return new Promise (resolve =>{
        axios.get('http://ip-api.com/json/'+publicIP+'?fields=city,query')
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    })
   
}



const weatherForecast_current = (city)=>{

    return new Promise (resolve =>{
        axios.get('http://api.weatherapi.com/v1/current.json?key=4a40cd26037541568b5130641231101&q='+city+'&aqi=yes', { headers: axiosHeader })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    })
   
}


const getWeather_byPublicIP = async()=>{

    const publicIP = await getPublicIp();
    console.log('public ip:',publicIP);

    const loc = await getLocation(publicIP);
    console.log('city:',loc.city);

    const weather = await weatherForecast_current(loc.city);

    console.log('------------------------------------');
    console.log('weather data');

    console.log('city:',weather.location.name);
    console.log('temp:',weather.current.temp_c);
    console.log('condition:',weather.current.condition.text);
    console.log('air quality (US EPA Index):',weather.current.air_quality['us-epa-index']);


    const weatherData = {
        city: weather.location.name,
        temp: weather.current.temp_c,
        condition: weather.current.condition.text,
        air_quality: weather.current.air_quality['us-epa-index']
    }

    return weatherData;
}

const getWeather_bySearch = async(city)=>{
    
    const weather = await weatherForecast_current(city);

    console.log('------------------------------------');
    console.log('weather data');

    console.log('city:',weather.location.name);
    console.log('temp:',weather.current.temp_c);
    console.log('condition:',weather.current.condition.text);
    console.log('air quality (US EPA Index):',weather.current.air_quality['us-epa-index']);

    console.log('------------------------------------');


    const weatherData = {
        city: weather.location.name,
        temp: weather.current.temp_c,
        condition: weather.current.condition.text,
        air_quality: weather.current.air_quality['us-epa-index']
    }

    return weatherData;
}



app.get('/', async (req, res) => {
    let getWeatherData = await getWeather_bySearch(req.city);
    res.json(getWeatherData);
    console.log('data from SERVER')
    
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


