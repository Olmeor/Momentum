import { forename } from "./script.js";
import { city } from "./script.js";
import { objChecked } from "./script.js";


export function setLocalStorage() {
  localStorage.setItem('name', forename.value);
  if (city.value != translation[currentLang].defaultCity) {
    localStorage.setItem('city', city.value);
  }
  localStorage.setItem('settings', JSON.stringify(objChecked));
  localStorage.setItem('theme', bgTheme.value);
  localStorage.setItem('bgApi', bgBlock.selectedIndex);
}

export function getLocalStorage() {
  if (localStorage.getItem('name')) {
    forename.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('settings')) {
    objChecked = JSON.parse(localStorage.getItem('settings'));
  }
  if (localStorage.getItem('theme')) {
    bgTheme.value = localStorage.getItem('theme');
  }
  if (localStorage.getItem('bgApi')) {
    bgBlock.selectedIndex = localStorage.getItem('bgApi');
  }
}