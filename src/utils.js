export {
  getWeatherIcon,
  tConvert,
  convertToCelsius,
  getCurrentTempUnit,
  setCurrentTempUnit,
  formatTemp,
  formatLength,
  getSpeedUnit,
  getVisibilityUnit,
};

let currentUnitSystem = "imperial";

let snowIcon = import("./assets/icons/snow.svg");
let thunderRainIcon = import("./assets/icons/thunder-rain.svg");
let clearDayIcon = import("./assets/icons/clear-day.svg");

const icons = {
  snow: snowIcon,
  "snow-showers-day": snowIcon,
  "snow-showers-night": snowIcon,
  "thunder-rain": thunderRainIcon,
  "thunder-showers-day": thunderRainIcon,
  "thunder-showers-night": thunderRainIcon,
  rain: import("./assets/icons/rain.svg"),
  "showers-day": import("./assets/icons/showers-day.svg"),
  "showers-night": import("./assets/icons/showers-night.svg"),
  fog: import("./assets/icons/fog.svg"),
  wind: import("./assets/icons/wind.svg"),
  cloudy: import("./assets/icons/cloudy.svg"),
  "partly-cloudy-day": import("./assets/icons/partly-cloudy-day.svg"),
  "partly-cloudy-night": import("./assets/icons/partly-cloudy-night.svg"),
  "clear-night": import("./assets/icons/clear-night.svg"),
  "clear-day": clearDayIcon,
  fallback: clearDayIcon,
};

async function getWeatherIcon(icon) {
  try {
    let weatherIcon = await icons[icon];
    return weatherIcon.default;
  } catch (error) {
    console.log(error);
    let fallbackIcon = await icons["fallback"];
    return fallbackIcon.default;
  }
}

function tConvert(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? "AM" : "PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
}

function getCurrentTempUnit() {
  return currentUnitSystem;
}

function setCurrentTempUnit(unit) {
  currentUnitSystem = unit;
}

function convertToCelsius(temp) {
  return ((temp - 32) * 5) / 9;
}

function formatTemp(temp) {
  if (currentUnitSystem === "metric") {
    return Math.round(convertToCelsius(temp));
  } else {
    return Math.round(temp);
  }
}

function convertToKm(length) {
  return length * 1.609344;
}

function formatLength(length) {
  if (currentUnitSystem === "metric") {
    return Math.round(convertToKm(length));
  } else {
    return Math.round(length);
  }
}

function getSpeedUnit() {
  if (currentUnitSystem === "metric") {
    return "k/ph";
  } else {
    return "m/ph";
  }
}

function getVisibilityUnit() {
  if (currentUnitSystem === "metric") {
    return "km";
  } else {
    return "mi";
  }
}
