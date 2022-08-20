// import '../css/owfont-regular.css'
// import '../css/style.css'

// Translate

// import { currentLang, translation, translate } from './translate.js';

// Clock and calendar

import showTime from './time.js';
showTime();

import showDate from './date.js';
showDate();

// Greeting and name

import {initGreeting, getTimeOfDay} from './greeting.js';
initGreeting();

// Background slider

import initSlider from './slider.js';
initSlider();

// Weather

import { initWeather } from './weather.js';
initWeather();

// Quotes

// import getQuotes from './quotes.js';
// getQuotes();

// Audio Player

import initAudio from './player.js';
initAudio();

// Settings

import initSettings from './settings.js';
initSettings();

// ToDo open / close

const todoMenu = document.querySelector('.todo-wrapper');
const todoButton = document.querySelector('.todo-button');
const todoButtonClose = document.querySelector('.todo-close-button');
const todoInputButton = document.querySelector('.todo-input-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let editId = false;

function toggleTodoMenu() {
  todoMenu.classList.toggle('todo-close');
}

todoButton.addEventListener('click', toggleTodoMenu);
todoButtonClose.addEventListener('click', toggleTodoMenu);

let todos = [];

function checkKeypressEnter(event) {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    addTodo();
    event.preventDefault();
  }
}

function addTodo() {
  if (editId) {
    todos[editId].text = todoInput.value;
    editId = false;
    renderTodo();
    todoInput.value = '';
    return;
  }
  const text = todoInput.value;
  const todo = {
    text,
    done: 'active',
    id: `${Math.random()}`,
  };
  todos.push(todo);
  todoInput.value = '';
  renderTodo();
  console.log(todos);
}

function deleteTodo(id) {
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.done = 'deleted';
    }
  })
  renderTodo();
}

function completeTodo(id) {
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.done = 'completed';
    }
  })
  renderTodo();
}

function renderTodo() {
  let todoItem = '';

  todos.forEach(todo => {
    if (todo.done == 'deleted' || todo.done == 'completed') {
      return;
    };

    todoItem += `
      <div class="todo-item">
        <input id="${todo.id}" type="checkbox" class="todoCheckbox" value="active">
        <span class="userTodo" contentEditable="false">${todo.text}</span>
        <button class="todo-item-done"></button>
        <button class="todo-item-edit"></button>
        <button  class="todo-item-delete"></button>
      </div>
    `;
  })

  todoList.innerHTML = todoItem;

}

todoInputButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', checkKeypressEnter);

todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains("todo-item-delete")) {
    const id = event.target.parentNode.firstElementChild.id;
    deleteTodo(id);
  }

  if (event.target.classList.contains("todo-item-done")) {
    const id = event.target.parentNode.firstElementChild.id;
    completeTodo(id);
  }

  if (event.target.classList.contains("todo-item-edit")) {
    const id = event.target.parentNode.firstElementChild.id;
    editTodo(id);
  }
})

function editTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      editId = i;
      console.log(editId);
      todoInput.value = todos[i].text;
      todoInput.focus();
      return;
    }
  }
}

renderTodo();
