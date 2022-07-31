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
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    forename.value = localStorage.getItem('name');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

// Slider

let randomNum = getRandomNum();
const body = document.body;
const slideNext = document.querySelector('.slide-prev');
const slidePrev = document.querySelector('.slide-next');

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

setBg();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
