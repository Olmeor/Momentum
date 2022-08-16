import {currentLang, translation, translate} from './translate.js';

const date = document.querySelector('.date');

function showDate() {
  let dateValue = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric', /* year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'*/};
  const currentDate = dateValue.toLocaleDateString(translation[currentLang].dataLanguage, options);
  date.textContent = currentDate;
}

export default showDate;