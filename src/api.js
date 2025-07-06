export {
    getWeatherData,
    processWeatherData
}

let currentWeatherData = "";

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=K8Y4TEWSGQMUAAAPR7FZNFFJG`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const weatherData = await response.json();
        currentWeatherData = weatherData;
        return weatherData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

function processWeatherData() {
    
}