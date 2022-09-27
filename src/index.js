import './style.css';

const todoList = document.querySelector('.todo-list');

const todos = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'completed the todo list',
    completed: false,
    index: 1,
  },
];

// create element for each todo list item
const createElement = (todo) => {
  const item = document.createElement('li');
  item.className = 'todo-item';
  item.setAttribute('key', todo.index);
  item.innerHTML = `<div class="form-control">
      <input type="checkbox" name="item1" id="item1" ${
  todo.completed ? 'checked' : ''
}>
      <label for="item1">${todo.description}</label>
  </div>
  <a href="#" type="button">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
  </a>`;

  todoList.appendChild(item);
};

// Display the list in the browser
const displayTodoList = () => {
  todos.forEach((todo) => {
    createElement(todo);
  });
};

document.addEventListener('DOMContentLoaded', displayTodoList);
