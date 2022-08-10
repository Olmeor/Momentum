// Translation

let currentLang = localStorage.getItem('language') ?? 'en';
const translation = {
  en: {
    placeholder: "[Enter name]",
    night: "Good night,",
    morning: "Good morning,",
    afternoon: "Good afternoon,",
    evening: "Good evening,",
    temperature: "Temperature",
    windSpeed: "Wind speed",
    windSpeedUnit: "m/s",
    humidity: "Humidity",
    dataLanguage: "en-EN",
    defaultCity: "Minsk",
    language: "Change language",
    time: "Time",
    date: "Date",
    greeting: "Greeting",
    quotes: "Quotes",
    weather: "Weather",
    audioPlayer: "Audio player",
    background: "Background",
    bgPlaceholder: "Enter the theme",
  },
  ru: {
    placeholder: "[Введите имя]",
    night: "Доброй ночи,",
    morning: "Доброе утро,",
    afternoon: "Добрый день,",
    evening: "Добрый вечер,",
    temperature: "Температура",
    windSpeed: "Скорость ветра",
    windSpeedUnit: "м/с",
    humidity: "Влажность",
    dataLanguage: "ru-RU",
    defaultCity: "Минск",
    language: "Изменить язык",
    time: "Время",
    date: "Дата",
    greeting: "Приветствие",
    quotes: "Цитаты",
    weather: "Погода",
    audioPlayer: "Аудио плеер",
    background: "Фон",
    bgPlaceholder: "Введите тему",
  },
};

function translate() {
  (currentLang == 'en') ? currentLang = 'ru' : currentLang = 'en';
  getQuotes();
  getWeather();
  setPlaceholder();
  setCity();
  setBgPlaceholder();
}

// Local Storage

function setLocalStorage() {
  localStorage.setItem('name', forename.value);
  if (city.value != translation[currentLang].defaultCity) {
    localStorage.setItem('city', city.value);
  }
  localStorage.setItem('settings', JSON.stringify(objChecked));
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    forename.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  objChecked = JSON.parse(localStorage.getItem('settings'));
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

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
  const options = {weekday: 'long', month: 'long', day: 'numeric', /* year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'*/};
  const currentDate = dateValue.toLocaleDateString(translation[currentLang].dataLanguage, options);
  date.textContent = currentDate;
}

showTime();
showDate();

// Greeting

const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
  const listTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const dateValue = new Date();
  const hour = dateValue.getHours();
  return listTimeOfDay[Math.floor(hour / 6)];
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `${translation[currentLang][timeOfDay]}`;
  greeting.textContent = greetingText;
}
showGreeting();

// Input name

const forename = document.querySelector('.name');

function setName() {
  if (localStorage.getItem('name')) forename.value = localStorage.getItem('name');
}

function setPlaceholder() {
  forename.placeholder = `${translation[currentLang].placeholder}`;
}

setPlaceholder();
setName();

// Background slider

let randomNum = getRandomNum();
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const bgBlock = document.querySelector('.switch-background');
const bgTheme = document.querySelector('.switch-background-theme');
const bgThemeButton = document.querySelector('.set-theme-button');
// let bgLink;

let bgSettings = {
  background: 'Github',
  theme: 'nature',
}

console.log(bgBlock)
console.log(bgBlock.options[bgBlock.selectedIndex].text);
console.log(bgTheme.value)

function getRandomNum(num = 20) { // num - количество картинок
  return Math.floor(Math.random() * num + 1);
}

function setBgGithub() {  
  const img = new Image();
  const bgNum = randomNum.toString().padStart(2, "0");
  img.src = `https://raw.githubusercontent.com/olmeor/momentum-backgrounds/main/${getTimeOfDay()}/${bgNum}.jpg`;

  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`
  };
}

async function setBgUnsplash() {
  let keywords = 'nature';
  const img = new Image();
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;
  const apiKey = '5_cu-PhTl04g5fxrPnaoSP5Qch_SC8ayif3cS-3G5Pw';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${keywords}&client_id=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.raw + `&h=${screenHeight}`;

  img.onload = () => {
      body.style.background = `center / cover url(${img.src})`;
  }
}

async function setBgFlickr() {
  let keywords = 'nature';
  const img = new Image();
  const apiKey = '50923158ad5431f62ff0ef2cee01c12a';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${keywords}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[getRandomNum(100)].url_l;

  img.onload = () => {
      body.style.background = `center / cover url(${img.src})`;
  }
}

function getSlideNext() {
  (randomNum == 20) ? randomNum = 1 : randomNum++;
  toggleBackground();
}

function getSlidePrev() {
  (randomNum == 1) ? randomNum = 20 : randomNum--;
  toggleBackground();
}

function toggleBackground() {
  // let backgroundLink = localStorage.getItem('link');
  const bgThemeBlock = document.querySelector('.bgThemeBlock')
  let bgLink = bgBlock.options[bgBlock.selectedIndex].text;
  // let bgLinkTheme = bgTheme.
  console.log(bgLink);
  switch(bgLink) {
    case 'Github': 
      setBgGithub();
      if(!bgThemeBlock.classList.contains('disable-block')) bgThemeBlock.classList.add('disable-block');
      break;
    case 'Unsplash API': 
      setBgUnsplash();
      if (bgThemeBlock.classList.contains('disable-block')) bgThemeBlock.classList.remove('disable-block');
      break;
    case 'Flickr API':
      setBgFlickr();
      if (bgThemeBlock.classList.contains('disable-block')) bgThemeBlock.classList.remove('disable-block');
      break;
  }
}

function setBgPlaceholder() {
  bgTheme.placeholder = `${translation[currentLang].bgPlaceholder}`;
}

// setBgPlaceholder();
toggleBackground();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

bgBlock.addEventListener("change", (e) => {
  // e.stopPropagation();
  console.log('пип фон');
  toggleBackground();
  // openThemeTextInput();
})

bgTheme.addEventListener("change", (e) => {
  // e.stopPropagation();
  console.log('пип тема');
  toggleBackground();
})

// mainForm.addEventListener("change", toggleSettings);
// bgBlock.addEventListener("change", toggleSettings);

// bgThemeButton.addEventListener("click", (e) => {
//   // e.stopPropagation();
//   console.log('пип кнопка');
//   toggleBackground();
// })

// Weather

const weatherIcon = document.querySelector('.weather-icon');
const weatherTemperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
let city = document.querySelector('.city');


function setCity() {
  city.value = (!localStorage.getItem('city')) ? city.value = translation[currentLang].defaultCity : city.value = localStorage.getItem('city');
}

async function getWeather() {
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
}

setCity();
getWeather();
city.addEventListener('change', getWeather);

// Quotes

const quoteButton = document.querySelector('.change-quote');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');

async function changeQuotes() {
  const quotes = `./assets/quotes/quotes-${currentLang}.json`;
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
const volumeButton = document.querySelector(".vol-mute");
const audioProgress = document.querySelector(".progress-bar");
const audioVolume = document.querySelector('.vol-line');
const audioCurrentTime = document.querySelector(".play-current-time");
const audioDurationTime = document.querySelector(".play-duration-time");

let isPlay = false;
let playNum = 0;
let activeSong = [];
let currentVolume;
let playListItem;
let currentTimeValue = 0;

function playAudio() {
  const itemActive = document.querySelectorAll('li.item-active');
  if (itemActive.length) itemActive[0].classList.remove('item-active');
  playListItem.forEach(song => {
    if (song.classList.contains('play-item-pause')) song.classList.remove('play-item-pause');
  });
  audio.src = playList[playNum].src;
  audio.currentTime = currentTimeValue;
  setDurationTime(playList[playNum].duration);
  if (!isPlay) {
    isPlay = true;
    audio.play();
    audio.volume = audioVolume.value/100;
    activeSong[playNum].classList.add('item-active');
    playListItem[playNum].classList.add('play-item-pause');
    setCurrentTime();
  } else {
    isPlay = false;
    audio.pause();
  }
  setSoundName(playList[playNum].title);
}

function playChoosenAudio() {
  for (let i = 0; i < playListItem.length; i++) {        
    playListItem[i].addEventListener('click', function() {
      if (i == playNum && isPlay) {
        isPlay = true;
        currentTimeValue = audio.currentTime;
        playAudio();
        addPauseButton();
      } else {
        if (i != playNum) currentTimeValue = 0;
        playListItem.forEach((item) => item.classList.remove('play-item-pause'))
        playListItem[i].classList.add('play-item-pause');
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
  currentTimeValue = 0;
  addPauseButton();
  playAudio();
}

function playPrevAudio() {
  (playNum == 0) ? playNum == playList.length-1 : playNum--;
  isPlay = false;
  currentTimeValue = 0;
  addPauseButton();
  playAudio();
}

function createPlayList() {
  playList.forEach(song => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = song.title;
    audioPlayList.append(li);
    const item = document.createElement('span');
    item.classList.add('play');
    item.classList.add('play-item-btn');
    li.append(item);
  });
  activeSong = document.querySelectorAll('.play-item');
  playListItem = document.querySelectorAll('.play-item-btn');
  playChoosenAudio();
}

function setSoundName(title) {
  soundTittle.textContent = title;
}

function setValue() {
  audio.volume = audioVolume.value / 100;
}

function muteAudio() {
  if (audioVolume.value > 0) {
      currentVolume = audioVolume.value;
      audioVolume.value = 0;
      volumeButton.classList.add('mute-icon');
      setValue();
  } else {
      audioVolume.value = currentVolume;
      volumeButton.classList.remove('mute-icon');
      setValue();
  }
}

function renewProgress(elem) {
  const {currentTime, duration} = elem.target;
  const currentValue = currentTime / duration * 100;
  if (!isNaN(currentValue))  {
      currentTimeValue = currentTime; 
      audioProgress.value = currentValue;
  }
}

function setProgress() {
  const audioDuration = audio.duration;
  if (!isNaN(audioDuration)) audio.currentTime = audioProgress.value / 100 * audioDuration;
  audio.addEventListener('timeupdate', renewProgress);
}

function convertTime(duration) {
  let minutes, seconds, minutesString, secondsString;
  minutes = Math.floor(duration / 60);
  seconds = Math.floor(duration % 60);
  minutesString = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  secondsString = (seconds < 10) ? "0" + String(seconds) : String(seconds);
  return `${minutesString}:${secondsString}`;
}

function setDurationTime(duration) {
  audioDurationTime.innerHTML = convertTime(duration);
}

function setCurrentTime() {
  audioCurrentTime.innerHTML = convertTime(currentTimeValue);
  setTimeout(setCurrentTime, 500);
}

createPlayList();
audioPlayButton.addEventListener('click', playAudio);
audioPlayButton.addEventListener('click', toggleButton);
audioPlayNextButton.addEventListener('click', playNextAudio);
audioPlayPrevButton.addEventListener('click', playPrevAudio);
audio.addEventListener('ended', playNextAudio);
volumeButton.addEventListener('click', muteAudio);
audioVolume.addEventListener('change', setValue);
audioProgress.addEventListener('change', setProgress);
audio.addEventListener('timeupdate', renewProgress);
audioProgress.oninput = function() {
  audio.removeEventListener('timeupdate', renewProgress);
}

// Settings menu

const settingsButton = document.querySelector('.settings');
const settingsForm = document.querySelector('.settings-form');
const settingsMenu = document.querySelector('.settings-wrapper');
const mainForm = document.forms.form;
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting-container');
const quotesBlock = document.querySelector('.quote-wrapper');
const playerBlock = document.querySelector('.player');
const weatherBlock = document.querySelector('.weather');


let userSettings = {
  languageButton: false,
  timeBlock: true,
  dateBlock: true,
  greetingBlock: true,
  quotesBlock: true,
  playerBlock: true,
  weatherBlock: true,
}

let objChecked = JSON.parse(localStorage.getItem('settings')) ?? userSettings;

function toggleSettingsMenu() {
  settingsForm.classList.toggle('settings-open');
  settingsMenu.classList.toggle('settings-menu-shadow');
}

// for (let key in userSettings) console.log (key, objChecked[key], mainForm[key].checked);

function toggleSettings() {
  for (let key in objChecked) {
    if (mainForm[key].checked != objChecked[key]) {
      objChecked[key] = !objChecked[key];
      toggleSettingBlock(key);
      console.log(key);
    }
  }
}

function toggleSettingBlock(key) {
  switch(key) {
    case 'languageButton':
      translate();
      setSettingLang();
      break;
    case 'timeBlock':
      timeBlock.classList.toggle('hidden-block');
      break;
    case 'dateBlock':
      dateBlock.classList.toggle('hidden-block');
      break;
    case 'greetingBlock':
      greetingBlock.classList.toggle('hidden-block');
      break;
    case 'quotesBlock':
      quotesBlock.classList.toggle('hidden-block');
      break;
    case 'playerBlock':
      playerBlock.classList.toggle('hidden-block');
      break;
    case 'weatherBlock':
      weatherBlock.classList.toggle('hidden-block');
      break;
  }
}

function setSettingLang() {
  document.querySelector('.setting-lang').textContent = `${translation[currentLang].language}`;
  document.querySelector('.setting-time').textContent = `${translation[currentLang].time}`;
  document.querySelector('.setting-date').textContent = `${translation[currentLang].date}`;
  document.querySelector('.setting-greeting').textContent= `${translation[currentLang].greeting}`;
  document.querySelector('.setting-quotes').textContent= `${translation[currentLang].quotes}`;
  document.querySelector('.setting-weather').textContent = `${translation[currentLang].weather}`;
  document.querySelector('.setting-audio').textContent = `${translation[currentLang].audioPlayer}`;
  document.querySelector('.setting-bg').textContent = `${translation[currentLang].background}`;
}

function setCheckedSettings() {
  for (let key in objChecked) {
    // console.log(key, mainForm[key].checked, objChecked[key]);
    mainForm[key].checked = objChecked[key];
    if (!mainForm[key].checked) toggleSettingBlock(key);
  }
}

setCheckedSettings();
setSettingLang();
settingsButton.addEventListener('click', toggleSettingsMenu);
settingsMenu.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target === settingsMenu) {
    toggleSettingsMenu();
  }
})

mainForm.addEventListener("change", (e) => {
  console.log('пип настройки');
  toggleSettings();
})



// Change background

/*
console.log(mainForm);
console.log(mainForm[7], mainForm[8]);
console.log(mainForm.backgroundBlock, mainForm.bgThemeBlock);
// const bgThemeBlock = mainForm.bgThemeBlock;
console.log(bgThemeBlock);
console.log(bgThemeBlock.value);
bgThemeBlock.value = "Новый фон";
console.log(bgThemeBlock.value);


// Получить все options
console.log(bgBlock.options);
// Получить индекс выбранного option
const bgBlockIndex = bgBlock.selectedIndex;
console.log(bgBlockIndex);
// Получить значение выбранного option
const bgBlockValue = bgBlock.value;
console.log(bgBlockValue);
// Получить текст выбранного option
const bgBlockText = bgBlock.options[bgBlockIndex].text;
console.log(bgBlockText);
console.log(mainForm.backgroundBlock.selectedIndex)

// Выбрать некий option
// bgBlock.options[1].selected = true;
// bgBlock.selectedIndex = 1;
// bgBlock.value = 2;
*/

// Import

import playList from './playList.js';

