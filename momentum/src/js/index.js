import '../css/owfont-regular.css'
import '../css/style.css'

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

// import initWeather from './weather.js';
// initWeather();

// Quotes

// import getQuotes from './quotes.js';
// getQuotes();

// Audio Player

import initAudio from './player.js';
initAudio();

// Settings

import initSettings from './settings.js';
initSettings();

// ToDo

import initTodo from './todo.js';
initTodo();
