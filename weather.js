function getWeather() {
    var longitude = document.getElementById("longitude").value;
    var latitude = document.getElementById("latitude").value;
    console.log(longitude);
    console.log(latitude); 
    alert("Your longitude is: " + longitude + " and your latitude " + latitude + "!!!")
    getWeatherForLocation(latitude, longitude)
}

function getWeatherForLocation(latitude, longitude) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+ '&appid=912fc7a6889db14789b92568847bc27e&units=metric&mode=json')
    .then(function(response) {
    return response.json();

    })
    .then(function(myJson) {
    console.log(myJson) ;
    document.getElementById("weatherData").innerHTML=JSON.stringify(myJson) ;
    populateData(myJson)
    });
}
   
function  populateData(myJson)  {
    document.getElementById("desc").innerHTML=myJson.weather[0].description;
    document.getElementById("temp").innerHTML=myJson.main.temp  +  'c';      
    document.getElementById("pressure").innerHTML=myJson.main.pressure  +  ' millibars';
    document.getElementById("humidity").innerHTML=myJson.main.humidity + '%';
    document.getElementById("windy").innerHTML=myJson.wind.speed + 'mph';
    document.getElementById("cloud").innerHTML=myJson.clouds.all + '%'; 
    document.getElementById("location").innerHTML=myJson.sys.country;
    document.getElementById("sunup").innerHTML=new Date(myJson.sys.sunrise*1000);
    document.getElementById("sundown").innerHTML=new Date(myJson.sys.sunrise*1000);
    document.getElementById("weatherpic").src= setWeatherImage(myJson.weather[0].description);
}

function setWeatherImage(weatherType) {
    console.log(weatherType)
    var image = new Image();

    switch(weatherType) {
        case "broken clouds" : image.src = './images/cloud.png';
        break;
        case "clear sky" : image.src = './images/sunny.png';
        break;
        case "thunderstorm" : image.src = './images/thunderstorm';
        break;
        case "snow" : image.src = './images/snow.png';
        break;
        case "overcast clouds" : image.src = './images/cloudy.png';
        break;
        default: image.src= './images/sunny.png';
    }
    return image.src;
}