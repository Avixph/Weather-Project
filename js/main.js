import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const defaultLocationInfo = "New York, US";
document.onload = paint(defaultLocationInfo);

const searchInput = document.querySelector("#city-search");
const getTempButton = document.querySelector("#getTemp");

const locationInfo = document.querySelector(".location p");
const iconInfo = document.querySelector(".weather-icon");
const descInfo = document.querySelector(".temperature-description p");
const tempInfo = document.querySelector(".temperature-value p");
const highLowInfo = document.querySelector(".high-low-value p");

const weatherUrl = process.env.BASE_URL;
const api_key = process.env.API_KEY;

// const weatherInfo = {};

//Add event listener to search button
getTempButton.addEventListener("click", async (e) => {
  e.preventDefault();
  getWeatherData(searchInput.value);
});

// Get weather data from api
function getWeatherData(query) {
  let api = `${weatherUrl}2.5/weather?q=${query}&units=imperial&APPID=${api_key}`;

  fetch(api)
    .then((weather) => errorHandler(weather))
    .then((weather) => {
      return weather.json();
    })
    // .then(function (data) {
    //   weatherInfo.city = weather.name;
    //   weatherInfo.country = weather.sys.country;
    //   weatherInfo.iconId = weather.weather[0].icon;
    //   weatherInfo.description = weather.weather[0].description;
    //   weatherInfo.temperature.value = Math.floor(weather.main.temp);
    //   weatherInfo.high.value = Math.floor(weather.main.temp_max);
    //   weatherInfo.low.value = Math.floor(weather.main.temp_min);
    // })
    .then(displayWeatherData)
    .catch((error) => console.log(error));
}

// Display the weather to the UI
function displayWeatherData(weather) {
  let locationValue = `${weather.name}, ${weather.sys.country}`;
  locationInfo.appendChild(locationValue);

  let iconnValue = `<img src="images+icons/${weather.weather[0].icon}.png"/>`;
  iconInfo.appendChild(iconnValue);

  let descValue = weather.weather[0].description;
  descInfo.appendChild(descValue);

  let tempValue = `${Math.floor(weather.main.temp)}°<span>F</span>`;
  tempInfo.appendChild(tempValue);

  let highLowValue = `H:${Math.floor(
    weather.main.temp_max
  )}<span>°F</span> L:${Math.floor(weather.main.temp_min)}<span>°F</span>`;
  highLowInfo.appendChild(highLowValue);

  store(locationValue);
}

function store(location) {
  localStorage.setItem("location", location);
}

//Changing the default location to searched one
function paint(defaultLocationInfo) {
  if (localStorage.getItem("location") === null) {
    getResults(defaultLocationInfo);
  } else {
    getResults(localStorage.getItem("location"));
  }
}

toggler.addEventListener("change", convertCurrent);
function convertCurrent(event) {
  // currentCity = document.querySelector(".location .city").innerText;
  getResults(locationInfo);
}

//Error handling
function errorHandler(weather) {
  if (!weather.ok) {
    if (weather.status === 404) {
      throw new Error("City Not Found");
    } else {
      throw new Error(weather.status + " : " + weather.statusText);
    }
  }
  return weather;
}
