export {
    updateCurrentWeather,
    updateConditions,
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
    currentTemp.innerHTML = `${temp}°`

    let currentIcon = document.createElement("img");
    currentIcon.src = await utils.getWeatherIcon(icon);
    currentIcon.className = "main-icon";

    let currentConditions = document.createElement("p");
    currentConditions.innerHTML = conditions;

    tempContainer.appendChild(currentTemp)
    tempContainer.appendChild(currentIcon)
    currentWeatherDiv.appendChild(currentLocation);
    currentWeatherDiv.appendChild(tempContainer);
    currentWeatherDiv.appendChild(currentConditions);
}

function updateConditions(feelsLike, rainChance, wind, uvIndex) {
    let feelsLikeEle = document.getElementById("feels-like");
    let rainChanceEle = document.getElementById("rain-chance");
    let windEle = document.getElementById("wind");
    let uvIndexEle = document.getElementById("uv-index");

    feelsLikeEle.textContent = `${feelsLike}°`;
    rainChanceEle.textContent = `${rainChance}%`;
    windEle.textContent = `${wind}m/ph`;
    uvIndexEle.textContent = uvIndex;
}