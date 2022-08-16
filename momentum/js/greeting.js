import {currentLang, translation, translate} from './translate.js';

const greeting = document.querySelector('.greeting');
const forename = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', forename.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    forename.value = localStorage.getItem('name');
  }
}

export function getTimeOfDay() {
  const listTimeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const dateValue = new Date();
  const hour = dateValue.getHours();
  return listTimeOfDay[Math.floor(hour / 6)];
}

export function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `${translation[currentLang][timeOfDay]}`;
  greeting.textContent = greetingText;

  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
}

export function setName() {
  if (localStorage.getItem('name')) forename.value = localStorage.getItem('name');
}

export function setPlaceholder() {
  forename.placeholder = `${translation[currentLang].placeholder}`;
}

export function initGreeting() {
  showGreeting();
  setPlaceholder();
  setName();
}
