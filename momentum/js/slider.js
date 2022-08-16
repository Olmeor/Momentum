import { getTimeOfDay } from './greeting.js';
import {currentLang, translation, translate} from './translate.js';

let randomNum = getRandomNum();
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const bgBlock = document.querySelector('.switch-background');
const bgThemeBlock = document.querySelector('.bgThemeBlock');
const bgTheme = document.querySelector('.switch-background-theme');
const bgThemeButton = document.querySelector('.set-theme-button');
let bgLink = (localStorage.getItem('bgApi')) ? +localStorage.getItem('bgApi') : 0;
const timeOfDay = getTimeOfDay();
bgTheme.value = localStorage.getItem('theme') ?? timeOfDay;
bgBlock.selectedIndex = bgLink;
let keywords = timeOfDay;

function getRandomNum(num = 20) {
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
  keywords = (bgTheme.value) ? bgTheme.value : timeOfDay;
  const img = new Image();
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;
  const apiKey = '5_cu-PhTl04g5fxrPnaoSP5Qch_SC8ayif3cS-3G5Pw';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${keywords ?? timeOfDay}&tag_mode=all&client_id=${apiKey}`;
  // const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=5_cu-PhTl04g5fxrPnaoSP5Qch_SC8ayif3cS-3G5Pw`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.raw + `&h=${screenHeight}`;

  img.onload = () => {
      body.style.background = `center/cover rgba(0, 0, 0, 0.5) url(${img.src})`;
  }
}

async function setBgFlickr() {
  keywords = ((bgTheme.value) ? bgTheme.value : timeOfDay).replace(/[^0-9a-zа-яё]/gi, ',');
  const img = new Image();
  const apiKey = '50923158ad5431f62ff0ef2cee01c12a';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${keywords}&extras=url_l&format=json&nojsoncallback=1`;
  // const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=50923158ad5431f62ff0ef2cee01c12a&tags=nature&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[getRandomNum(100)].url_l;

  img.onload = () => {
      body.style.background = `center/cover rgba(0, 0, 0, 0.5) url(${img.src})`;
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
  bgLink = bgBlock.selectedIndex;
  switch(bgLink) {
    case 0: //'Github': 
      setBgGithub();
      if(!bgThemeBlock.classList.contains('disable-block')) bgThemeBlock.classList.add('disable-block');
      break;
    case 1: //'Unsplash API': 
      setBgUnsplash();
      if (bgThemeBlock.classList.contains('disable-block')) bgThemeBlock.classList.remove('disable-block');
      break;
    case 2: //'Flickr API':
      setBgFlickr();
      if (bgThemeBlock.classList.contains('disable-block')) bgThemeBlock.classList.remove('disable-block');
      break;
  }
}

export function setBgPlaceholder() {
  bgTheme.placeholder = `${translation[currentLang].bgPlaceholder}`;
}

function setLocalStorage() {
  localStorage.setItem('theme', bgTheme.value);
  localStorage.setItem('bgApi', bgBlock.selectedIndex);
}

function getLocalStorage() {
  if (localStorage.getItem('theme')) {
    bgTheme.value = localStorage.getItem('theme');
  }
  if (localStorage.getItem('bgApi')) {
    bgBlock.selectedIndex = localStorage.getItem('bgApi');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

export default function initSlider() {
  toggleBackground();
  slideNext.addEventListener('click', getSlideNext);
  slidePrev.addEventListener('click', getSlidePrev);
  
  bgBlock.addEventListener("change", (e) => {
    toggleBackground();
  })
  
  bgTheme.addEventListener("change", (e) => {
    toggleBackground();
  })
}

