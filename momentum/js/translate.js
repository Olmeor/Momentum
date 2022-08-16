import getQuotes from './quotes.js';
import { getWeather, setCity } from "./weather.js";
import { setPlaceholder } from "./greeting.js";
import { setBgPlaceholder } from "./slider.js";

export let currentLang = localStorage.getItem('language') ?? 'en';

export const translation = {
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

export function translate() {
  (currentLang == 'en') ? currentLang = 'ru' : currentLang = 'en';
  getQuotes();
  getWeather();
  setPlaceholder();
  setCity();
  setBgPlaceholder();
}