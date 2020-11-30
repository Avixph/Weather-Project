// const { default: Axios } = require("axios");
import axios from "axios";
import images from "../images/*.png";

// require("dotenv").config();

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
getWeather.addEventListener("click", async (e) => {
  e.preventDefault();
  let locationQuery = searchInput.value;
  try {
    // Get weather data from api
    let weatherApi = await axios.get(
      `${weatherUrl}2.5/weather?q=${locationQuery}&units=imperial&APPID=${api_key}`
    );
    console.log(weatherApi);

    // Display the weather to the UI
    const locationValue = `${weatherApi.name}, ${weatherApi.sys.country}`;
    locationInfo.innerText = locationValue;

    let iconValue = `<img src="images+icons/${
      images[weatherApi.weather[0].icon]
    }.png"/>`;
    iconInfo.innerHTML = iconValue;

    // iconInfo.innerHTML.setAttribute("src", images[weatherApi.weather[0].icon]);

    const descValue = weatherApi.weather[0].description;
    descInfo.innerText = descValue;

    const tempValue = `${Math.floor(weatherApi.main.temp)}°<span>F</span>`;
    tempInfo.innerHTML = tempValue;

    const highLowValue = `H:${Math.floor(
      weatherApi.main.temp_max
    )}<span>°F</span> L:${Math.floor(weatherApi.main.temp_min)}<span>°F</span>`;
    highLowInfo.innerHTML = highLowValue;

    //check if the temperature is under 40, and red if above 90
    if (Math.floor(weatherApi.main.temp) <= 40) {
      tempInfo.getElementsByClassName.color = "var(--third-color)";
    } else if (Math.floor(weather.main.temp) >= 90) {
      tempInfo.getElementsByClassName.color = "var(--sixth-color)";
    }
  } catch (err) {
    //Error handling
    console.log("Incorrect city name.", err);
    let errorMessage = "Error: City Not Found.";
    locationInfo.innerText = errorMessage;
  }
});
