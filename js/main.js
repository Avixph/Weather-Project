// const { default: Axios } = require("axios");

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const searchInput = document.querySelector("#city-search");
const getWeather = document.querySelector("#getTemp");

const locationInfo = document.querySelector(".location p");
const iconInfo = document.querySelector(".weather-icon");
const descInfo = document.querySelector(".temperature-description p");
const tempInfo = document.querySelector(".temperature-value p");
const highLowInfo = document.querySelector(".high-low-value p");

const weatherUrl = process.env.BASE_URL;
const api_key = process.env.API_KEY;

// const weatherInfo = {};

//Add event listener to search button
getWeather.addEventListener("click", async () => {
  let locationQuery = searchInput.value;
  try {
    // Get weather data from api
    let weatherApi = await axios.get(
      `${weatherUrl}2.5/weather?q=${locationQuery}&units=imperial&APPID=${api_key}`
    );
    console.log(weatherApi);

    // Display the weather to the UI
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

    //check if the temperature is under 40, and red if above 90
    if (Math.floor(weather.main.temp) <= 40) {
      tempInfo.getElementsByClassName.color = "var(--third-color)";
    } else if (Math.floor(weather.main.temp) >= 90) {
      tempInfo.getElementsByClassName.color = "var(--sixth-color)";
    }
  } catch (err) {
    //Error handling
    console.log("Incorrect city name.", err);
    let errorMessage = `Error: City Not Found.`;
    locationInfo.appendChild(errorMessage);
  }
});
