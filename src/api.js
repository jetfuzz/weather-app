export {
    getWeatherData,
    processWeatherData
}

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=K8Y4TEWSGQMUAAAPR7FZNFFJG`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

function processWeatherData(weatherData) {
    return {
        resolvedAddress: weatherData.resolvedAddress,
        conditions: weatherData.currentConditions.conditions,
        temp: weatherData.currentConditions.temp,
        icon: weatherData.currentConditions.icon,

        feelsLike: weatherData.currentConditions.feelslike,
        windSpeed: weatherData.currentConditions.windspeed,
        precipChance: weatherData.currentConditions.precipprob,
        uvIndex: weatherData.currentConditions.uvindex,

        hourlyForecast: weatherData.days[0].hours.map(hour => ({
            time: hour.datetime,
            icon: hour.icon,
            temp: hour.temp
        })),

        dailyForecast: weatherData.days.slice(0, 7).map(day => ({
            date: day.datetime,
            icon: day.icon,
            conditions: day.conditions,
            tempMax: day.tempmax,
            tempMin: day.tempmin
        }))
    }
}