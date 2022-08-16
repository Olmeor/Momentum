// Local Storage
/*
function setLocalStorage() {
  localStorage.setItem('name', forename.value);
  if (city.value != translation[currentLang].defaultCity) {
    localStorage.setItem('city', city.value);
  }
  localStorage.setItem('settings', JSON.stringify(objChecked));
  localStorage.setItem('theme', bgTheme.value);
  localStorage.setItem('bgApi', bgBlock.selectedIndex);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    forename.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('settings')) {
    objChecked = JSON.parse(localStorage.getItem('settings'));
  }
  if (localStorage.getItem('theme')) {
    bgTheme.value = localStorage.getItem('theme');
  }
  if (localStorage.getItem('bgApi')) {
    bgBlock.selectedIndex = localStorage.getItem('bgApi');
  }
}
*/

// window.addEventListener('beforeunload', setLocalStorage);
// window.addEventListener('load', getLocalStorage);

// Clock and calendar

import showTime from './time.js';
showTime();

import showDate from './date.js';
showDate();

// Greeting and name

import {initGreeting, getTimeOfDay} from './greeting.js';
initGreeting();

// Background slider

import initSlider from './slider.js';
initSlider();

// Weather

import { initWeather } from './weather.js';
initWeather();

// Quotes

// import getQuotes from './quotes.js';
// getQuotes();

// Audio Player

import initAudio from './player.js';
initAudio();

// Settings

import initSettings from './settings.js';
initSettings();
