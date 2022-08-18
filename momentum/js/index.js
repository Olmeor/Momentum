// import '../css/owfont-regular.css'
// import '../css/style.css'

// Translate

// import { currentLang, translation, translate } from './translate.js';

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

const todoMenu = document.querySelector('.todo');
const todoButton = document.querySelector('.todo-button');

function toggleTodoMenu() {
  todoMenu.classList.toggle('todo-close'); //disable-block
  // settingsMenu.classList.toggle('settings-menu-shadow');
}

todoButton.addEventListener('click', toggleTodoMenu);

