let http = require('http');
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

app.use(express.json());


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

const location = async() =>{
    const publicIP = await getPublicIp();
    console.log('public ip:',publicIP);

    const location = await getLocation(publicIP);
    console.log('city:',location.city);
    return location.city;
   
}



app.get('/location', async (req, res) => {
    let getData = await location(req.city);
   
    console.log(getData);

    res.json(getData);
    console.log('data from SERVER')
    
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});





