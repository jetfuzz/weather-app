export {
    updateCurrentWeather,
    updateConditions,
}

function updateCurrentWeather(location, temp, icon, conditions) {
    let currentWeatherDiv = document.querySelector(".current-weather");

    currentWeatherDiv.innerHTML = `
        <h2 class="main-location">${location}</h2>
        <h1 class="main-temp">${temp}&deg; ${icon}</h1>
        <p class="main-conditions">${conditions}</p>
    `;
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