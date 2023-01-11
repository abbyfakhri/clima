
const getWeatherData = (cityName)=>{
    return new Promise (resolve =>{
        $.ajax({
            type: "POST",

            "headers": {

                "Access-Control-Allow-Origin":"*",                
                "Access-Control-Allow-Headers": "*"
            },

            contentType: 'application/x-www-form-urlencoded',



            url: "localhost:3000",
            
            data: { 
            
                city:cityName 
            
            },

            
            

            success: function(data) {
              // Handle the response data
              resolve(data);
            },

            error:(err)=>{
                console.log(err);
            }
          });
    })
}

const updateData = async(cityName)=>{
    const weatherData = await getWeatherData(cityName);
    const city = document.getElementById('city');
    const temp = document.getElementById('temp');
    const condition = document.getElementById('condition');
    const air_quality = document.getElementById('air-quality');

    city.innerText = weatherData.city;
    temp.innerText = weatherData.temp;
    condition.innerText = weatherData.condition;
    air_quality.innerText = weatherData.innerText;

}

const button = document.getElementById('button');
button.addEventListener('click',()=>{
    const form = document.getElementById('inputCity');
    console.log('clicked');
    updateData(form.value);
})