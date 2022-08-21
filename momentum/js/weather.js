import {currentLang, translation, translate} from './translate.js';

let city = document.querySelector('.city');

function setLocalStorage() {
  if (city.value != translation[currentLang].defaultCity) {
    localStorage.setItem('city', city.value);
  }
}

function getLocalStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}

export function setCity() {
  city.value = (!localStorage.getItem('city')) ? city.value = translation[currentLang].defaultCity : city.value = localStorage.getItem('city');
}

export async function getWeather() {
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherTemperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const weatherWind = document.querySelector('.wind');
  const weatherHumidity = document.querySelector('.humidity');
  const weatherError = document.querySelector('.weather-error');
  localStorage.setItem('city', city.value);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${currentLang}&appid=7153241524dddce83603c2b94a1ad19c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherError.textContent = ``;
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherTemperature.textContent = `${translation[currentLang].temperature}: ${Math.round(data.main.temp)}°C`;
    weatherWind.textContent = `${translation[currentLang].windSpeed}: ${Math.round(data.wind.speed)} ${translation[currentLang].windSpeedUnit}`;
    weatherHumidity.textContent = `${translation[currentLang].humidity}: ${Math.round(data.main.humidity)}%`;
    weatherDescription.textContent = data.weather[0].description;
  } catch {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${currentLang}&appid=7153241524dddce83603c2b94a1ad19c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = '';
    weatherTemperature.textContent = ``;
    weatherWind.textContent = ``;
    weatherHumidity.textContent = ``;
    weatherDescription.textContent = ``;
    if (data.cod == 404) {
      weatherError.textContent = `Error! City not found!`;
    } else if (data.cod == 400) {
      weatherError.textContent = `Nothing to geocode!`;
    }
  }
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
}

export default function initWeather() {
  setCity();
  getWeather();
  city.addEventListener('change', getWeather);
}
