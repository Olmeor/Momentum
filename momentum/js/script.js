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
    // console.log(data.weather[0].id, data.weather[0].description, data.main.temp, city.value);
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

// Quotes

const quoteButton = document.querySelector('.change-quote');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');

async function changeQuotes() {  
  const quotes = './assets/quotes/quotes-eng.json';
  const res = await fetch(quotes);
  const data = await res.json();
  quoteText.innerHTML = `"${data[getRandomNum(data.length)].text}"`;
  quoteAuthor.innerHTML = data[getRandomNum(data.length)].author;
}

function getQuotes() {
  changeQuotes();
  quoteButton.addEventListener('click', getQuotes);
}

getQuotes();

// Audio

const audio = new Audio();
const audioPlayButton = document.querySelector('.play');
const audioPlayNextButton = document.querySelector('.play-next');
const audioPlayPrevButton = document.querySelector('.play-prev');
const audioPlayList = document.querySelector('.play-list');

const soundTittle = document.querySelector(".play-title");
const volButton = document.querySelector(".vol-mute");
const audioProgress = document.querySelector(".progress-bar");
const audioVolume = document.querySelector('.volume');
const audioExactTime = document.querySelector(".play-cur-time");
const audioDurationTime = document.querySelector(".play-dur-time");


let isPlay = false;
let playNum = 0;
let activeSong = [];
let currentVolume;
let playListBtn;
let currentTimeGlobal = 0;

function playAudio() {
  const itemActive = document.querySelectorAll('li.item-active');
  if (itemActive.length) itemActive[0].classList.remove('item-active');

  playListBtn.forEach(song => {
    if (song.classList.contains('play-item-pause')) song.classList.remove('play-item-pause');
  });
  audio.src = playList[playNum].src;
  audio.currentTime = currentTimeGlobal;
  setDurationTime(playList[playNum].duration);
  if (!isPlay) {
    isPlay = true;
    audio.play();
    audio.volume = audioVolume.value/100;
    activeSong[playNum].classList.add('item-active');
    playListBtn[playNum].classList.add('play-item-pause');
    setExactTime();
  } else {
    isPlay = false;
    audio.pause();
  }
  setSoundName(playList[playNum].title);
}

function playChoosenAudio() {
  for (let i = 0; i < playListBtn.length; i++) {        
    playListBtn[i].addEventListener('click', function() {
      if (i == playNum && isPlay) {
        isPlay = true;
        currentTimeGlobal = audio.currentTime;
        playAudio();
        addPauseButton();
      } else {
        if (i != playNum) currentTimeGlobal = 0;
        playListBtn.forEach((item) => item.classList.remove('play-item-pause'))
        playListBtn[i].classList.add('play-item-pause');
        playNum = i;
        isPlay = false;
        playAudio();
        addPauseButton();
      }
    })
  }
}

function toggleButton() {
  audioPlayButton.classList.toggle('pause');
}

function addPauseButton() {
  audioPlayButton.classList.add('pause');
}

function playNextAudio() {
  (playNum == playList.length-1) ? playNum = 0 : playNum++;
  isPlay = false;
  currentTimeGlobal = 0;
  addPauseButton();
  playAudio();
}

function playPrevAudio() {
  (playNum == 0) ? playNum == playList.length-1 : playNum--;
  isPlay = false;
  currentTimeGlobal = 0;
  addPauseButton();
  playAudio();
}

function createPlayList() {
  playList.forEach(song => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = song.title;
    audioPlayList.append(li);
    const btn = document.createElement('span');
    btn.classList.add('play');
    btn.classList.add('play-item-btn');
    li.append(btn);
  });
  activeSong = document.querySelectorAll('.play-item');
  playListBtn = document.querySelectorAll('.play-item-btn');
}

function setSoundName(title) {
  soundTittle.textContent = title;
}

function setValue() {
  audio.volume = audioVolume.value/100;
}

function muteAudio() {
  if (audioVolume.value > 0) {
      currentVolume = audioVolume.value;
      audioVolume.value = 0;
      volButton.classList.add('mute-icon');
      setValue();
  } else {
      audioVolume.value = currentVolume;
      volButton.classList.remove('mute-icon');
      setValue();
  }
}

function updateProgress(e) {
  const {currentTime, duration} = e.target;
  const currentValue = currentTime / duration * 100;
  if (!isNaN(currentValue))  {
      currentTimeGlobal = currentTime; 
      audioProgress.value = currentValue;
  }
}

function setProgress() {
  const audioDuration = audio.duration;
  audio.currentTime = audioProgress.value / 100 * audioDuration;
  audio.addEventListener('timeupdate', updateProgress);
}

function convertTime(duration) {
  let minutes, seconds, minutesString, secondsString;
  minutes = Math.floor(duration/60);
  seconds = Math.floor(duration%60);
  minutesString = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  secondsString = (seconds < 10) ? "0" + String(seconds) : String(seconds);
  return `${minutesString}:${secondsString}`;
}

function setDurationTime(duration) {
  audioDurationTime.innerHTML = convertTime(duration);
}

function setExactTime() {
  audioExactTime.innerHTML = convertTime(currentTimeGlobal);
  setTimeout(setExactTime, 500);
}

createPlayList();
audioPlayButton.addEventListener('click', playAudio);
audioPlayButton.addEventListener('click', toggleButton);
audioPlayNextButton.addEventListener('click', playNextAudio);
audioPlayPrevButton.addEventListener('click', playPrevAudio);
audio.addEventListener('ended', playNextAudio);
playChoosenAudio();
volButton.addEventListener('click', muteAudio);
audioVolume.addEventListener('change', setValue);
audioProgress.addEventListener('change', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audioProgress.oninput = function() {
  audio.removeEventListener('timeupdate', updateProgress);
}

// Import

import playList from './playList.js';