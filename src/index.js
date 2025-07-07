import "./style.css";
import * as api from "./api";

async function showWeatherData(location) {
    let weatherData = await api.getWeatherData(location);
    let processedWeatherData = api.processWeatherData(weatherData);
    return processedWeatherData;
}

console.log(showWeatherData("Vancouver"));