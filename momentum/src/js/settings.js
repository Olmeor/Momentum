import { currentLang, translation, translate } from './translate.js';
import getQuotes from './quotes.js';

const settingsButton = document.querySelector('.settings-button');
const settingsForm = document.querySelector('.settings-form');
const settingsMenu = document.querySelector('.settings-wrapper');
const mainForm = document.querySelectorAll('.checkbox');
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting-container');
const quotesBlock = document.querySelector('.quote-wrapper');
const playerBlock = document.querySelector('.player');
const weatherBlock = document.querySelector('.weather');
let objChecked;
let userSettings = {
  languageButton: false,
  timeBlock: true,
  dateBlock: true,
  greetingBlock: true,
  quotesBlock: true,
  playerBlock: true,
  weatherBlock: true,
}

function toggleSettingsMenu() {
  settingsForm.classList.toggle('settings-open');
  settingsForm.classList.toggle('hidden-block');
  settingsMenu.classList.toggle('settings-menu-shadow');
}

function toggleSettings() {
  for (let key = 0; key < 7; key++) {
    if(mainForm[key].checked != objChecked[mainForm[key].name]) {
      objChecked[mainForm[key].name] = !objChecked[mainForm[key].name];
      toggleSettingBlock(mainForm[key].name);
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
  if (localStorage.getItem('settings') == 'null' || localStorage.getItem('settings') == 'undefined') {
    localStorage.setItem('settings', JSON.stringify(userSettings))
  }
  if (localStorage.getItem('settings')) {
    objChecked = JSON.parse(localStorage.getItem('settings'));
  } else {
    objChecked = userSettings;
    localStorage.setItem('settings', JSON.stringify(objChecked));
  }
  for (let key = 0; key < 7; key++) {
    mainForm[key].checked = objChecked[mainForm[key].name];
    if (!mainForm[key].checked) {
      toggleSettingBlock(mainForm[key].name);
    }
  }
  localStorage.setItem('settings', JSON.stringify(objChecked));
}

function setLocalStorage() {
  localStorage.setItem('settings', JSON.stringify(objChecked));
}

function getLocalStorage() {
  if (localStorage.getItem('settings')) {
    objChecked = JSON.parse(localStorage.getItem('settings'));
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

export default function initSettings() {
  setCheckedSettings();
  setSettingLang();  
  settingsButton.addEventListener('click', toggleSettingsMenu);
  settingsMenu.addEventListener('click', (e) => {
    if (e.target === settingsMenu) {
      toggleSettingsMenu();
    }
  })
  settingsForm.addEventListener("change", (e) => {
    toggleSettings();
  })
  getQuotes();
}
