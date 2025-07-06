import "./style.css";
import * as api from "./api";

console.log('test');

let weatherTest = api.getWeatherData("Vancouver");

console.log(weatherTest);