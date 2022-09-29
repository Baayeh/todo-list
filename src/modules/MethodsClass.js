import { todoList, msg } from './DOMElements.js';

export default class Methods {
  static todos = [];

  /** ************************
        MAIN FUNCTIONS
  ************************** */

  // Get All Todos from LocalStorage
  static getTodos() {
    const parsedTodos = JSON.parse(localStorage.getItem('todos'));
    if (parsedTodos) {
      this.todos = parsedTodos;
      msg.textContent = '';
      this.displayTodoList();
    } else {
      msg.textContent = 'Ooops!! There are no todos available';
      msg.style.textAlign = 'center';
      msg.style.padding = '10px';
    }
  }

  // create element for each todo list item
  static createElement = (todo) => {
    const item = document.createElement('li');
    item.className = 'todo-item';
    item.setAttribute('key', todo.index);
    item.innerHTML = `<div class="form-control">
    <input type="checkbox" name="item-${todo.index}" class="checkInput" ${
      todo.completed ? 'checked' : ''
    }>
    <input type="text" class="list-input ${
      todo.completed ? 'strikethrough' : ''
    }" value="${todo.description}">
</div>
<a href="#" type="button" class="toggleBtn">
  <i class="fa-solid fa-ellipsis-vertical"></i>
</a>
`;

    todoList.appendChild(item);
    msg.textContent = '';
    msg.style.display = 'none';
  };

  // Display the list in the browser
  static displayTodoList = () => {
    const sortedTodos = this.todos.sort((a, b) => a.index - b.index);
    sortedTodos.forEach((todo) => {
      this.createElement(todo);
    });
  };

  // Add a new todo to the array
  static addTodo = (todo) => {
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  };

  static updateTodo = (key, value, completedValue) => {
    const result = this.todos.find(
      (todo) => String(key) === String(todo.index),
    );

    result.description = value;
    result.completed = completedValue;

    localStorage.setItem('todos', JSON.stringify(this.todos));

    todoList.innerHTML = '';
    this.displayTodoList();
  };

  // Remove a todo from the array
  static removeTodo = (key) => {
    const result = this.todos.filter(
      (todo) => String(key) !== String(todo.index),
    );

    const updatedTodos = result.map((todo, Oldindex) => ({
      ...todo,
      index: Oldindex + 1,
    }));

    this.todos = updatedTodos;

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    if (!updatedTodos.length) {
      msg.textContent = 'Ooops!! There are no todos available';
      msg.style.textAlign = 'center';
      msg.style.padding = '10px';
      msg.style.display = 'block';
      localStorage.clear();
    }

    todoList.innerHTML = '';

    this.displayTodoList();
  };

  static removeAllCompleted = () => {
    const uncompletedTodos = this.todos.filter(
      (todo) => todo.completed === false,
    );
    this.todos = uncompletedTodos;

    if (uncompletedTodos.length) {
      localStorage.setItem('todos', JSON.stringify(uncompletedTodos));
    } else {
      msg.textContent = 'All Tasks Completed';
      msg.style.textAlign = 'center';
      msg.style.padding = '10px';
      msg.style.display = 'block';
      localStorage.clear();
    }

    todoList.innerHTML = '';
    this.displayTodoList();
  };

  /** ************************
      END OF  MAIN FUNCTIONS
  ************************** */

  // Get All li tags
  static getAll = () => {
    const lis = document.querySelectorAll('.todo-item');
    return lis;
  };
}
