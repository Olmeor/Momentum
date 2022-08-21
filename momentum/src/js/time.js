import showDate from './date.js';
import { showGreeting } from './greeting.js';

const time = document.querySelector('.time');

function showTime() {
  let date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  setTimeout(showDate, 1000);
  setTimeout(showGreeting, 1000);
}

export default showTime;