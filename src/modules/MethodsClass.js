import { todoList, msg } from './DOMElements.js';

const focus = false;

export default class Methods {
  static todos = [];

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
    <input type="checkbox" name="item1" ${
      todo.completed ? 'checked' : ''
    }>
    <input type="text" class="list-input" value="${todo.description}" ${focus ? '' : 'readonly'}>
</div>
<a href="#" type="button" class="toggleBtn">
  <i class="fa-solid fa-ellipsis-vertical"></i>
</a>
<a href="#" type="button" class="removeBtn">
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
</a>`;

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

  static getAll = () => {
    const lis = document.querySelectorAll('.todo-item');
    return lis;
  }
}

export { focus };
