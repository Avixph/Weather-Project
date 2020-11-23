import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const weatherUrl = process.env.BASE_URL;
//remember, make a .env file and save your key
const api_key = process.env.API_KEY;
