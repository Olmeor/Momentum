// Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime() {
  let date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  setTimeout(showDate, 1000);
  setTimeout(showGreeting, 1000);
}

function showDate() {
  let dateValue = new Date();
  // const options = {weekday: 'long', month: 'long', day: 'numeric', /* year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'*/};
  // const currentDate = dateValue.toLocaleDateString('ru-Ru', options);
  const options = {weekday: 'long', month: 'long', day: 'numeric', /* year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'*/};
  const currentDate = dateValue.toLocaleDateString('en-US', options);
  date.textContent = currentDate;
}


showTime();
showDate();

// Greeting

const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
  // const listTimeOfDay = ['Спокойной ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];
  const listTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const dateValue = new Date();
  const hour = dateValue.getHours();
  return listTimeOfDay[Math.floor(hour / 6)];
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
}

showGreeting();

// Input name

const forename = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', forename.value);
  localStorage.setItem('city', city.value ?? 'Minsk');
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    forename.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

// Background slider

let randomNum = getRandomNum();
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getRandomNum(num = 20) { // num - количество картинок
  return Math.floor(Math.random() * num + 1);
}

function setBg() {  
  const img = new Image();
  const bgNum = randomNum.toString().padStart(2, "0");
  img.src = `https://raw.githubusercontent.com/olmeor/momentum-backgrounds/main/${getTimeOfDay()}/${bgNum}.jpg`;

  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`
  };
}

function getSlideNext() {
  (randomNum == 20) ? randomNum = 1 : randomNum++;
  setBg(randomNum);
}

function getSlidePrev() {
  (randomNum == 1) ? randomNum = 20 : randomNum--;
  setBg(randomNum);
}

setBg(randomNum);
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// Weather

const weatherIcon = document.querySelector('.weather-icon');
const weatherTemperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
let city = document.querySelector('.city');
city.value = (!localStorage.getItem('city')) ? city.value = 'Minsk' : city.value = localStorage.getItem('city');

async function getWeather() {

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=7153241524dddce83603c2b94a1ad19c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp, city.value);
    weatherError.textContent = ``;
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherTemperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    weatherHumidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    weatherDescription.textContent = data.weather[0].description;
  } catch {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=7153241524dddce83603c2b94a1ad19c&units=metric`;
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
}

getWeather();
city.addEventListener('change', getWeather);
