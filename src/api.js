export {
    getWeatherData,
    processWeatherData
}

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=K8Y4TEWSGQMUAAAPR7FZNFFJG`);
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("Location not found");
            } else if (response.status === 429 || response.status === 401) {
                throw new Error("Service unavailable, please try again later");
            }
            throw new Error(`Response status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        throw error
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