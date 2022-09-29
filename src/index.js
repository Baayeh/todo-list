import Todo from './modules/TodoClass.js';
import Methods from './modules/MethodsClass.js';
import {
  form, todoList, updateForm, clearBtn,
} from './modules/DOMElements.js';

document.addEventListener('DOMContentLoaded', Methods.getTodos());

let activeKey = null;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [todo] = form.elements;

  const index = Methods.todos.length + 1;
  const description = todo.value;
  const completed = false;

  const newTodo = new Todo(index, description, completed);

  Methods.addTodo(newTodo);

  form.reset();
  Methods.createElement(newTodo);
});

const lis = Methods.getAll();

todoList.addEventListener('click', (e) => {
  // SET BACKGROUND COLOR OF TODO ITEM AND REPLACE TOGGLE BTN WITH DELETE BTN
  if (e.target.tagName === 'INPUT') {
    // eslint-disable-next-line no-use-before-define
    resetStyle();
    const li = e.target.parentElement.parentElement;
    li.style.backgroundColor = 'rgba(251, 251, 177, 0.508)';
    const anchorTag = li.lastElementChild;

    activeKey = anchorTag.parentElement.getAttribute('key');

    // create delete button
    const a = document.createElement('a');
    a.setAttribute('class', 'deleteBtn');
    a.setAttribute('type', 'button');
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fa-solid fa-trash"></i>';

    li.replaceChild(a, anchorTag);
  }

  // REMOVE TODO ITEM
  if (e.target.parentElement.classList.contains('deleteBtn')) {
    const anchorTag = e.target.parentElement;
    const key = anchorTag.parentElement.getAttribute('key');
    Methods.removeTodo(key);

    anchorTag.parentElement.remove();
    window.location.reload();
  }
});

// RESET BACKGROUND COLOR OF LI AND REPLACE DELETE BTN WITH TOGGLE BTN
const resetStyle = () => {
  lis.forEach((li) => {
    li.style.backgroundColor = 'white';
    // create dots button
    const anchorTag = li.lastElementChild;
    const a = document.createElement('a');
    a.setAttribute('class', 'toggleBtn');
    a.setAttribute('type', 'button');
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    li.replaceChild(a, anchorTag);
  });
};

// UPDATE TODO
updateForm.addEventListener('change', (e) => {
  let completedValue = false;

  if (e.target.classList.contains('checkInput')) {
    const { value } = e.target.nextElementSibling;
    // eslint-disable-next-line no-unused-expressions
    e.target.checked ? (completedValue = true) : (completedValue = false);
    Methods.updateTodo(activeKey, value, completedValue);
  }
  if (e.target.classList.contains('list-input')) {
    const newValue = e.target.value;
    Methods.updateTodo(activeKey, newValue, completedValue);
  }
});

// Remove all completed todo items
clearBtn.addEventListener('click', () => {
  Methods.removeAllCompleted();
});
