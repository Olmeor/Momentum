import { currentLang, translation, translate } from './translate.js';

const todoMenu = document.querySelector('.todo-wrapper');
const todoButton = document.querySelector('.todo-button');
const todoButtonClose = document.querySelector('.todo-close-button');
const todoInputButton = document.querySelector('.todo-input-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let editId = false;
let todos = JSON.parse(localStorage.getItem('todos')) ?? [];

function toggleTodoMenu() {
  todoMenu.classList.toggle('todo-close');
}

todoButton.addEventListener('click', toggleTodoMenu);
todoButtonClose.addEventListener('click', toggleTodoMenu);

function setLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorage() {
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
}

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
  setLocalStorage();
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
      todoInput.value = todos[i].text;
      todoInput.focus();
      return;
    }
  }
}

export function setTodoLang() {
  todoInput.placeholder = `${translation[currentLang].todoPlaceholder}`;
  document.querySelector('.todo-header').textContent = `${translation[currentLang].todoList}`;
}

export default function initTodo() {
  setTodoLang();
  renderTodo();
}