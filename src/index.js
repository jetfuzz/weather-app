import "./style.css";
import * as api from "./api";
import * as dom from "./dom";
import * as utils from "./utils";

const searchForm = document.querySelector(".search-form");
const loader = document.getElementById("loader-dialog");
const celsiusBtn = document.getElementById("celsius-btn");
const fahrenheitBtn = document.getElementById("fahrenheit-btn");

let weatherData;

async function getAndProcessWeatherData(location) {
  let rawWeatherData = await api.getWeatherData(location);
  let processedWeatherData = api.processWeatherData(rawWeatherData);
  return processedWeatherData;
}

function updateWeatherDisplay() {
  dom.updateCurrentWeather(
    weatherData.resolvedAddress,
    weatherData.temp,
    weatherData.icon,
    weatherData.conditions,
  );
  dom.updateConditions(
    weatherData.feelsLike,
    weatherData.humidity,
    weatherData.precipChance,
    weatherData.windSpeed,
    weatherData.uvIndex,
    weatherData.visibility,
  );
  dom.displayHourlyForecast(weatherData);
  dom.displayWeekForecast(weatherData);
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.showModal();
  try {
    const searchQuery = document.getElementById("search-input").value;
    weatherData = await getAndProcessWeatherData(searchQuery);
    updateWeatherDisplay();
    loader.close();
  } catch (error) {
    console.log(error);
    loader.close();
    dom.displayError(error);
  }
});

celsiusBtn.addEventListener("click", () => {
  utils.setCurrentTempUnit("metric");
  dom.setActiveBtn();
  updateWeatherDisplay();
});

fahrenheitBtn.addEventListener("click", () => {
  utils.setCurrentTempUnit("imperial");
  dom.setActiveBtn();
  updateWeatherDisplay();
});

async function displayDefault() {
    loader.showModal();
  try {
    weatherData = await getAndProcessWeatherData("vancouver");
    updateWeatherDisplay();
    loader.close();
  } catch (error) {
    console.log(error);
    dom.displayError(error);
    loader.close();
  }
}

window.addEventListener("load", () => {
  displayDefault();
});

window.addEventListener("click", () => {
  dom.hideError();
});
