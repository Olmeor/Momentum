import {currentLang, translation, translate} from './translate.js';

const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');

async function changeQuotes() {
  const quotes = `./assets/quotes/quotes-${currentLang}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuoteNum = Math.floor(Math.random() * data.length);
  quoteText.innerHTML = `"${data[randomQuoteNum].text}"`;
  quoteAuthor.innerHTML = data[randomQuoteNum].author;
}

export default function getQuotes() {
  changeQuotes();
  quoteButton.addEventListener('click', getQuotes);
}
