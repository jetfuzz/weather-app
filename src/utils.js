export {
    getWeatherIcon,
    tConvert,
    convertToCelsius,
    getCurrentTempUnit,
    setCurrentTempUnit,
    formatTemp,
}

let currentTempUnit = "F";

let snowIcon = import("./assets/icons/snow.svg");
let thunderRainIcon = import("./assets/icons/thunder-rain.svg");
let clearDayIcon = import("./assets/icons/clear-day.svg")

const icons = {
    "snow": snowIcon,
    "snow-showers-day": snowIcon,
    "snow-showers-night": snowIcon,
    "thunder-rain": thunderRainIcon,
    "thunder-showers-day": thunderRainIcon,
    "thunder-showers-night": thunderRainIcon,
    "rain": import("./assets/icons/rain.svg"),
    "showers-day": import("./assets/icons/showers-day.svg"),
    "showers-night": import("./assets/icons/showers-night.svg"),
    "fog": import("./assets/icons/fog.svg"),
    "wind": import("./assets/icons/wind.svg"),
    "cloudy": import("./assets/icons/cloudy.svg"),
    "partly-cloudy-day": import("./assets/icons/partly-cloudy-day.svg"),
    "partly-cloudy-night": import("./assets/icons/partly-cloudy-night.svg"),
    "clear-night": import("./assets/icons/clear-night.svg"),
    "clear-day": clearDayIcon,
    "fallback": clearDayIcon
}

async function getWeatherIcon(icon) {
    try {
        let weatherIcon = await icons[icon];
        return weatherIcon.default;

    } catch (error) {
        let fallbackIcon = await icons["fallback"];
        return fallbackIcon.default;
    }
}

function tConvert(time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { 
    time = time.slice (1);  
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
    time[0] = +time[0] % 12 || 12; 
  }
  return time.join ('');
}

function convertToCelsius(temp) {
    return (temp - 32) * 5 / 9;
}

function getCurrentTempUnit() {
    return currentTempUnit;
}

function setCurrentTempUnit(unit) {
    currentTempUnit = unit;
}

function formatTemp(temp) {
    if (currentTempUnit === "C") {
        return Math.round(convertToCelsius(temp));
    } else {
        return Math.round(temp);
    }
}