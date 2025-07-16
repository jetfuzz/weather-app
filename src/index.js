import "./style.css";
import * as api from "./api";
import * as dom from "./dom";

const searchForm = document.querySelector(".search-form");
const loader = document.getElementById("loader-dialog");

async function getAndProcessWeatherData(location) {
    let weatherData = await api.getWeatherData(location);
    let processedWeatherData = api.processWeatherData(weatherData);
    return processedWeatherData;
}

async function displayDefault() {
    try {
        let weatherData = await getAndProcessWeatherData("vancouver");
        dom.updateCurrentWeather(weatherData.resolvedAddress, weatherData.temp, weatherData.icon, weatherData.conditions);
        dom.updateConditions(weatherData.feelsLike, weatherData.precipChance, weatherData.windSpeed, weatherData.uvIndex);
        dom.displayHourForecast(weatherData);
    } catch (error) {
        console.log(error);
    }
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.showModal();
    try {
        const searchQuery =  document.getElementById("search-input").value;
        let weatherData = await getAndProcessWeatherData(searchQuery);
        console.log(weatherData)
        dom.updateCurrentWeather(weatherData.resolvedAddress, weatherData.temp, weatherData.icon, weatherData.conditions);
        dom.updateConditions(weatherData.feelsLike, weatherData.precipChance, weatherData.windSpeed, weatherData.uvIndex);
        dom.displayHourForecast(weatherData);
        loader.close();
    } catch (error) {
        console.log(error);
        loader.close();
        dom.displayError(error);
    }
})

window.addEventListener("load", () => {
    displayDefault();
})

window.addEventListener("click", () => {
    dom.hideError();
})
