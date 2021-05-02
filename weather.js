const COORDS = 'coords';
const API_KEY = "04935ed9eb3c04be1ecdbb50b58d2939";

let currentTemp = document.querySelector(".current-temp"),
    feelsLike = document.querySelector(".feels-like"),
    minTemp = document.querySelector(".min-temp"),
    maxTemp = document.querySelector(".max-temp"),
    place = document.querySelector(".place-name");


function loadWeather(data){
    currentTemp.append(`현재날씨:${data.main.temp}도`);
    feelsLike.append(`${data.main.feels_like}도`);
    maxTemp.append(`최고:${data.main.temp_max}도`);
    minTemp.append(`최저:${data.main.temp_min}도`);
    place.append(`위치:${data.name}`);
}

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
       loadWeather(json);
       console.log(json);
    })
    
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();