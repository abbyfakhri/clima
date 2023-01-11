
const getLocationData = ()=>{

    return new Promise (resolve =>{
        fetch('http://localhost:3000/location',{
            method: 'GET',
            //mode: 'no-cors', // this cause a trouble because using corse
            headers: {
                "Accept": "application/json"
            }

        })
        .then(response => response.json())
        .then(data => {  
          resolve(data.loc);
          console.log(data.loc);
        })
    })

    
}



const addLocation = async ()=> {
    const data = await getLocationData();
    const locationContainer = document.getElementById('location');
    locationContainer.innerText = data;
}

addLocation();