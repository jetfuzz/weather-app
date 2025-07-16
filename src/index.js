import "./style.css";
import * as api from "./api";
import * as dom from "./dom";
import * as utils from "./utils";

const searchForm = document.querySelector(".search-form");
const loader = document.getElementById("loader-dialog");
const celsiusBtn = document.getElementById("celsius-btn");
const farenheitBtn = document.getElementById("farenheit-btn");

let weatherData;

async function getAndProcessWeatherData(location) {
    let rawWeatherData = await api.getWeatherData(location);
    let processedWeatherData = api.processWeatherData(rawWeatherData);
    return processedWeatherData;
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.showModal();
    try {
        const searchQuery =  document.getElementById("search-input").value;
        weatherData = await getAndProcessWeatherData(searchQuery);        
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

celsiusBtn.addEventListener("click", () => {
    utils.setCurrentTempUnit("C");
    dom.setActiveBtn();
    dom.updateCurrentWeather(weatherData.resolvedAddress, weatherData.temp, weatherData.icon, weatherData.conditions);
    dom.updateConditions(weatherData.feelsLike, weatherData.precipChance, weatherData.windSpeed, weatherData.uvIndex);
    dom.displayHourForecast(weatherData);
})

farenheitBtn.addEventListener("click", () => {
    utils.setCurrentTempUnit("F");
    dom.setActiveBtn();
    dom.updateCurrentWeather(weatherData.resolvedAddress, weatherData.temp, weatherData.icon, weatherData.conditions);
    dom.updateConditions(weatherData.feelsLike, weatherData.precipChance, weatherData.windSpeed, weatherData.uvIndex);
    dom.displayHourForecast(weatherData);
})

async function displayDefault() {
    try {
        weatherData = await getAndProcessWeatherData("vancouver");
        dom.updateCurrentWeather(weatherData.resolvedAddress, weatherData.temp, weatherData.icon, weatherData.conditions);
        dom.updateConditions(weatherData.feelsLike, weatherData.precipChance, weatherData.windSpeed, weatherData.uvIndex);
        dom.displayHourForecast(weatherData);
    } catch (error) {
        console.log(error);
        dom.displayError(error);
    }
}

window.addEventListener("load", () => {
    displayDefault();
})

window.addEventListener("click", () => {
    dom.hideError();
})
