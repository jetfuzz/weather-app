export {
    updateCurrentWeather,
    updateConditions,
    displayHourForecast,
}

import * as utils from "./utils";

async function updateCurrentWeather(location, temp, icon, conditions) {
    let currentWeatherDiv = document.querySelector(".current-weather");
    currentWeatherDiv.innerHTML = ""

    let currentLocation = document.createElement("h2");
    currentLocation.className = "main-location";
    currentLocation.innerHTML = location;

    let tempContainer = document.createElement("div");
    tempContainer.className = "temp-container";

    let currentTemp = document.createElement("h1");
    currentTemp.className = "main-temp";
    currentTemp.innerHTML = `${Math.round(temp)}°`

    let currentIcon = document.createElement("img");
    currentIcon.src = await utils.getWeatherIcon(icon);
    currentIcon.className = "main-icon";

    let currentConditions = document.createElement("p");
    currentConditions.innerHTML = conditions;

    tempContainer.appendChild(currentTemp);
    tempContainer.appendChild(currentIcon);
    currentWeatherDiv.appendChild(currentLocation);
    currentWeatherDiv.appendChild(tempContainer);
    currentWeatherDiv.appendChild(currentConditions);
}

function updateConditions(feelsLike, rainChance, wind, uvIndex) {
    let feelsLikeEle = document.getElementById("feels-like");
    let rainChanceEle = document.getElementById("rain-chance");
    let windEle = document.getElementById("wind");
    let uvIndexEle = document.getElementById("uv-index");

    feelsLikeEle.textContent = `${Math.round(feelsLike)}°`;
    rainChanceEle.textContent = `${rainChance}%`;
    windEle.textContent = `${wind} m/ph`;
    uvIndexEle.textContent = uvIndex;
}

async function createHourForecastElement(time, icon, temp) {
    let forecastDiv = document.createElement("div");
    forecastDiv.className = "forecast-item";

    let forecastTime = document.createElement("p");
    forecastTime.innerHTML = time;

    let forecastIcon = document.createElement("img");
    forecastIcon.src = await utils.getWeatherIcon(icon);
    forecastIcon.className = "forecast-icon";

    let forecastTemp = document.createElement("p");
    forecastTemp.className = "forecast-temp";
    forecastTemp.innerHTML = `${temp}°`;

    forecastDiv.appendChild(forecastTime);
    forecastDiv.appendChild(forecastIcon);
    forecastDiv.appendChild(forecastTemp);

    return forecastDiv;
}

async function displayHourForecast(weatherData) {
    let forecastContainer = document.querySelector(".forecast-items");

    // console.log(weatherData.hourlyForecast)

    for (let hour of weatherData.hourlyForecast) {
        let  time = utils.tConvert(hour.time).replace(":00:00", " ")
        let forecastDiv = await createHourForecastElement(time, hour.icon, Math.round(hour.temp));
        forecastContainer.appendChild(forecastDiv);
    }
}