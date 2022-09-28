import './style.css';
import Todo from './modules/TodoClass.js';
import Methods from './modules/MethodsClass.js';
import { form, todoList } from './modules/DOMElements.js';

document.addEventListener('DOMContentLoaded', Methods.getTodos());

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [todo] = form.elements;

  const index = Methods.todos.length + 1;
  const description = todo.value;
  const completed = false;

  const newTodo = new Todo(index, description, completed);

  Methods.addTodo(newTodo);

  Methods.createElement(newTodo);
  form.reset();
});

const lis = Methods.getAll();

const resetStyle = () => {
  lis.forEach((li) => {
    const inputField = li.firstElementChild.lastElementChild;
    inputField.addEventListener('blur', () => {
      li.style.backgroundColor = 'white';
      inputField.setAttribute('readonly', true);
    });
  });
};

todoList.addEventListener('click', (e) => {
  resetStyle();
  if (e.target.tagName === 'I') {
    // eslint-disable-next-line no-unused-vars
    const id = e.target.parentElement.getAttribute('key');

    const formControl = e.target.parentElement.previousElementSibling;
    const formInput = formControl.lastElementChild;
    formInput.removeAttribute('readonly');
    formInput.focus();
    const parentOfFormControl = formControl.parentElement;
    parentOfFormControl.style.backgroundColor = 'rgba(251, 251, 177, 0.508)';
  }
});
