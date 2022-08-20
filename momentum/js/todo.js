import { currentLang, translation, translate } from './translate.js';

const todoMenu = document.querySelector('.todo-wrapper');
const todoButton = document.querySelector('.todo-button');
const todoButtonClose = document.querySelector('.todo-close-button');
const todoInputButton = document.querySelector('.todo-input-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoHeader = document.querySelector('.todo-header');
let editId = false;
let todos = JSON.parse(localStorage.getItem('todos')) ?? [];
const todoStatus = ['active', 'completed', 'deleted'];

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
    return;
  }
  const text = todoInput.value;
  const todo = {
    text,
    status: 'active',
    id: `${Math.random()}`,
  };
  todos.push(todo);
  renderTodo();
}

function deleteTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id && todos[i].status != 'deleted') {
      todos[i].status = 'deleted';
      renderTodo();
      return;
    } else if (todos[i].id === id && todos[i].status == 'deleted') {
      todos.splice(i, 1);
      renderTodo();
      return;
    }
  }
}

function completeTodo(id) {
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.status = 'completed';
    }
  })
  renderTodo();
}

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

function renderTodo() {
  todoInput.value = '';
  let todoItem = '';

  todos.forEach(todo => {
      if (todoStatus[todoHeader.selectedIndex] == todo.status) {  
      todoItem += `
        <div class="todo-item">
          <input id="${todo.id}" type="checkbox" class="todoCheckbox" value="active">
          <span class="userTodo" contentEditable="false">${todo.text}</span>
          <button class="todo-item-done"></button>
          <button class="todo-item-edit"></button>
          <button  class="todo-item-delete"></button>
        </div>
      `;
    }
  })

  todoList.innerHTML = todoItem;
  setLocalStorage();
}

todoInputButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', checkKeypressEnter);
todoHeader.addEventListener('change', (event) => {
  renderTodo();
})

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

export function setTodoLang() {
  todoInput.placeholder = `${translation[currentLang].todoPlaceholder}`;
  todoHeader.options[0].text = `${translation[currentLang].todoActive}`;
  todoHeader.options[1].text = `${translation[currentLang].todoCompleted}`;
  todoHeader.options[2].text = `${translation[currentLang].todoDeleted}`;
}

export default function initTodo() {
  renderTodo();
}
