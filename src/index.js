import "./style.css";
import * as api from "./api";

const searchForm = document.querySelector(".search-form");

async function showWeatherData(location) {
    let weatherData = await api.getWeatherData(location);
    let processedWeatherData = api.processWeatherData(weatherData);
    return processedWeatherData;
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const searchQuery =  document.getElementById("search-input").value;
        console.log(await showWeatherData(searchQuery));
    } catch (error) {
        console.log(error);
    }
})
