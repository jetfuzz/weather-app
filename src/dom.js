export {
  updateCurrentWeather,
  updateConditions,
  displayHourlyForecast,
  displayWeekForecast,
  displayError,
  hideError,
  setActiveBtn,
};

import * as utils from "./utils";

async function updateCurrentWeather(location, temp, icon, conditions) {
  let currentWeatherDiv = document.querySelector(".current-weather");
  currentWeatherDiv.innerHTML = "";

  let currentLocation = document.createElement("h2");
  currentLocation.className = "main-location";
  currentLocation.innerHTML = location;

  let tempContainer = document.createElement("div");
  tempContainer.className = "temp-container";

  let currentTemp = document.createElement("h1");
  currentTemp.className = "main-temp";
  currentTemp.innerHTML = `${utils.formatTemp(temp)}°`;

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

function updateConditions(
  feelsLike,
  humidity,
  rainChance,
  wind,
  uvIndex,
  visibility,
) {
  let feelsLikeEle = document.getElementById("feels-like");
  let humidityEle = document.getElementById("humidity");
  let rainChanceEle = document.getElementById("rain-chance");
  let windEle = document.getElementById("wind");
  let uvIndexEle = document.getElementById("uv-index");
  let visibilityEle = document.getElementById("visibility");

  feelsLikeEle.innerHTML = `${utils.formatTemp(feelsLike)}°`;
  humidityEle.innerHTML = `${Math.round(humidity)}%`;
  rainChanceEle.innerHTML = `${rainChance}%`;
  windEle.innerHTML = `${utils.formatLength(wind)} ${utils.getSpeedUnit()}`;
  uvIndexEle.innerHTML = uvIndex;
  visibilityEle.innerHTML = `${utils.formatLength(visibility)} ${utils.getVisibilityUnit()}`;
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
  forecastTemp.innerHTML = `${utils.formatTemp(temp)}°`;

  forecastDiv.appendChild(forecastTime);
  forecastDiv.appendChild(forecastIcon);
  forecastDiv.appendChild(forecastTemp);

  return forecastDiv;
}

async function displayHourlyForecast(weatherData) {
  let forecastContainer = document.querySelector(".forecast-items");
  forecastContainer.innerHTML = "";

  for (let hour of weatherData.hourlyForecast) {
    let time = utils.tConvert(hour.time).replace(":00:00", " ");
    let forecastDiv = await createHourForecastElement(
      time,
      hour.icon,
      Math.round(hour.temp),
    );
    forecastContainer.appendChild(forecastDiv);
  }
}

async function createDayForecastElement(date, icon, conditions, high, low) {
  let forecastItem = document.createElement("div");
  forecastItem.className = "week-forecast-item";

  let datePara = document.createElement("p");
  datePara.innerHTML = date;

  let forecastContainer = document.createElement("div");
  forecastContainer.className = "week-forecast-container";
  let forecastIcon = document.createElement("img");
  forecastIcon.src = await utils.getWeatherIcon(icon);
  forecastIcon.alt = "weather icon";
  let forecastConditions = document.createElement("p");
  forecastConditions.innerHTML = conditions;

  let highLowPara = document.createElement("p");
  highLowPara.innerHTML = `${utils.formatTemp(high)}°/${utils.formatTemp(low)}°`;

  forecastContainer.appendChild(forecastIcon);
  forecastContainer.appendChild(forecastConditions);
  forecastItem.appendChild(datePara);
  forecastItem.appendChild(forecastContainer);
  forecastItem.appendChild(highLowPara);

  return forecastItem;
}

async function displayWeekForecast(weatherData) {
  let weekForecastContainer = document.querySelector(".week-forecast-items");
  weekForecastContainer.innerHTML = "";

  for (let day of weatherData.dailyForecast) {
    let forecastDiv = await createDayForecastElement(
      day.date,
      day.icon,
      day.conditions,
      day.tempMax,
      day.tempMin,
    );
    weekForecastContainer.appendChild(forecastDiv);
  }
}

function displayError(error) {
  let errorDiv = document.querySelector(".search-error");
  let errorMessage = document.querySelector(".error-message");
  let timer = 3000;

  errorDiv.style.visibility = "visible";
  errorMessage.innerHTML = error;

  setTimeout(() => {
    errorDiv.style.visibility = "hidden";
  }, timer);
}

function hideError() {
  let errorDiv = document.querySelector(".search-error");
  errorDiv.style.visibility = "hidden";
}

function setActiveBtn() {
  const celsiusBtn = document.getElementById("celsius-btn");
  const fahrenheitBtn = document.getElementById("fahrenheit-btn");
  if (utils.getCurrentTempUnit() === "metric") {
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
  } else {
    celsiusBtn.classList.remove("active");
    fahrenheitBtn.classList.add("active");
  }
}
