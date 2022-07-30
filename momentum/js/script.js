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
  const currentDate = dateValue.toLocaleDateString('ru-Ru', options);
  date.textContent = currentDate;
}


showTime();
showDate();

// Greeting

const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
  const listTimeOfDay = ['Спокойной ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];
  const dateValue = new Date();
  const hour = dateValue.getHours();
  return listTimeOfDay[Math.floor(hour / 6)];
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `${timeOfDay},`;
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