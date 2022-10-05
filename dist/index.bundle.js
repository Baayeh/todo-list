"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_TodoClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/TodoClass.js */ "./src/modules/TodoClass.js");
/* harmony import */ var _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/MethodsClass.js */ "./src/modules/MethodsClass.js");
/* harmony import */ var _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/DOMElements.js */ "./src/modules/DOMElements.js");




document.addEventListener('DOMContentLoaded', _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].getTodos());

let activeKey = null;

_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [todo] = _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.elements;

  const index = _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].todos.length + 1;
  const description = todo.value;
  const completed = false;

  const newTodo = new _modules_TodoClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](index, description, completed);

  if (newTodo.description !== '') {
    _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodo(newTodo);

    _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.reset();
    _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(newTodo);
  }
});

const lis = _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].getAll();

// SET BACKGROUND COLOR OF TODO ITEM AND REPLACE TOGGLE BTN WITH DELETE BTN
_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.todoList.addEventListener('click', (e) => {
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

    anchorTag.parentElement.remove();

    _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeTodo(key);
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
_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.updateForm.addEventListener('change', (e) => {
  let completedValue = false;

  if (e.target.classList.contains('checkInput')) {
    const { value } = e.target.nextElementSibling;
    // eslint-disable-next-line no-unused-expressions
    e.target.checked ? (completedValue = true) : (completedValue = false);
    _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(activeKey, value, completedValue);
  }
  if (e.target.classList.contains('list-input')) {
    const newValue = e.target.value;
    if (newValue !== '') {
      _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(activeKey, newValue, completedValue);
    } else {
      _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.todoList.innerHTML = '';
      _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].displayTodoList();
    }
  }
});

// Remove all completed todo items
_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.clearBtn.addEventListener('click', () => {
  _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllCompleted();
});


/***/ }),

/***/ "./src/modules/DOMElements.js":
/*!************************************!*\
  !*** ./src/modules/DOMElements.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearBtn": () => (/* binding */ clearBtn),
/* harmony export */   "form": () => (/* binding */ form),
/* harmony export */   "input": () => (/* binding */ input),
/* harmony export */   "li": () => (/* binding */ li),
/* harmony export */   "msg": () => (/* binding */ msg),
/* harmony export */   "todoList": () => (/* binding */ todoList),
/* harmony export */   "toggleBtn": () => (/* binding */ toggleBtn),
/* harmony export */   "updateForm": () => (/* binding */ updateForm)
/* harmony export */ });
const todoList = document.querySelector('.todo-list');
const li = document.querySelector('.todo-item');
const input = document.querySelector('.list-input');
const form = document.querySelector('#form');
const toggleBtn = document.querySelector('.toggleBtn');
const msg = document.querySelector('.no-books');
const updateForm = document.querySelector('.updateForm');
const clearBtn = document.querySelector('.clearBtn');




/***/ }),

/***/ "./src/modules/MethodsClass.js":
/*!*************************************!*\
  !*** ./src/modules/MethodsClass.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Methods)
/* harmony export */ });
/* harmony import */ var _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMElements.js */ "./src/modules/DOMElements.js");


class Methods {
  static todos = [];

  /** ************************
        MAIN FUNCTIONS
  ************************** */

  // Get All Todos from LocalStorage
  static getTodos() {
    const parsedTodos = JSON.parse(localStorage.getItem('todos'));
    if (parsedTodos) {
      this.todos = parsedTodos;
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.textContent = '';
      this.displayTodoList();
    } else {
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.textContent = 'Ooops!! There are no todos available';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.textAlign = 'center';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.padding = '10px';
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

    _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.todoList.appendChild(item);
    _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.textContent = '';
    _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.display = 'none';
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

    result.description = (value !== '') ? value : result.description;
    result.completed = completedValue;

    localStorage.setItem('todos', JSON.stringify(this.todos));

    _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.todoList.innerHTML = '';
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
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.textContent = 'Ooops!! There are no todos available';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.textAlign = 'center';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.padding = '10px';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.display = 'block';
      localStorage.clear();
    }

    _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.todoList.innerHTML = '';

    this.displayTodoList();
  };

  static removeAllCompleted = () => {
    const uncompletedTodos = this.todos.filter(
      (todo) => todo.completed === false,
    );
    this.todos = uncompletedTodos;

    if (uncompletedTodos.length) {
      const updatedTodos = uncompletedTodos.map((todo, Oldindex) => ({
        ...todo,
        index: Oldindex + 1,
      }));
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } else {
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.textContent = 'All Tasks Completed';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.textAlign = 'center';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.padding = '10px';
      _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.display = 'block';
      localStorage.clear();
    }

    _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.todoList.innerHTML = '';
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


/***/ }),

/***/ "./src/modules/TodoClass.js":
/*!**********************************!*\
  !*** ./src/modules/TodoClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Todo {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9NZXRob2RzQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL1RvZG9DbGFzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kbyBmcm9tICcuL21vZHVsZXMvVG9kb0NsYXNzLmpzJztcbmltcG9ydCBNZXRob2RzIGZyb20gJy4vbW9kdWxlcy9NZXRob2RzQ2xhc3MuanMnO1xuaW1wb3J0IHtcbiAgZm9ybSwgdG9kb0xpc3QsIHVwZGF0ZUZvcm0sIGNsZWFyQnRuLFxufSBmcm9tICcuL21vZHVsZXMvRE9NRWxlbWVudHMuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgTWV0aG9kcy5nZXRUb2RvcygpKTtcblxubGV0IGFjdGl2ZUtleSA9IG51bGw7XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IFt0b2RvXSA9IGZvcm0uZWxlbWVudHM7XG5cbiAgY29uc3QgaW5kZXggPSBNZXRob2RzLnRvZG9zLmxlbmd0aCArIDE7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gdG9kby52YWx1ZTtcbiAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XG5cbiAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKGluZGV4LCBkZXNjcmlwdGlvbiwgY29tcGxldGVkKTtcblxuICBpZiAobmV3VG9kby5kZXNjcmlwdGlvbiAhPT0gJycpIHtcbiAgICBNZXRob2RzLmFkZFRvZG8obmV3VG9kbyk7XG5cbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgTWV0aG9kcy5jcmVhdGVFbGVtZW50KG5ld1RvZG8pO1xuICB9XG59KTtcblxuY29uc3QgbGlzID0gTWV0aG9kcy5nZXRBbGwoKTtcblxuLy8gU0VUIEJBQ0tHUk9VTkQgQ09MT1IgT0YgVE9ETyBJVEVNIEFORCBSRVBMQUNFIFRPR0dMRSBCVE4gV0lUSCBERUxFVEUgQlROXG50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgcmVzZXRTdHlsZSgpO1xuICAgIGNvbnN0IGxpID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGxpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1MSwgMjUxLCAxNzcsIDAuNTA4KSc7XG4gICAgY29uc3QgYW5jaG9yVGFnID0gbGkubGFzdEVsZW1lbnRDaGlsZDtcblxuICAgIGFjdGl2ZUtleSA9IGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAvLyBjcmVhdGUgZGVsZXRlIGJ1dHRvblxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RlbGV0ZUJ0bicpO1xuICAgIGEuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICBhLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPic7XG5cbiAgICBsaS5yZXBsYWNlQ2hpbGQoYSwgYW5jaG9yVGFnKTtcbiAgfVxuXG4gIC8vIFJFTU9WRSBUT0RPIElURU1cbiAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVCdG4nKSkge1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3Qga2V5ID0gYW5jaG9yVGFnLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdrZXknKTtcblxuICAgIGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgTWV0aG9kcy5yZW1vdmVUb2RvKGtleSk7XG4gIH1cbn0pO1xuXG4vLyBSRVNFVCBCQUNLR1JPVU5EIENPTE9SIE9GIExJIEFORCBSRVBMQUNFIERFTEVURSBCVE4gV0lUSCBUT0dHTEUgQlROXG5jb25zdCByZXNldFN0eWxlID0gKCkgPT4ge1xuICBsaXMuZm9yRWFjaCgobGkpID0+IHtcbiAgICBsaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIC8vIGNyZWF0ZSBkb3RzIGJ1dHRvblxuICAgIGNvbnN0IGFuY2hvclRhZyA9IGxpLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9nZ2xlQnRuJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgIGEuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWxcIj48L2k+JztcbiAgICBsaS5yZXBsYWNlQ2hpbGQoYSwgYW5jaG9yVGFnKTtcbiAgfSk7XG59O1xuXG4vLyBVUERBVEUgVE9ET1xudXBkYXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICBsZXQgY29tcGxldGVkVmFsdWUgPSBmYWxzZTtcblxuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja0lucHV0JykpIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgIGUudGFyZ2V0LmNoZWNrZWQgPyAoY29tcGxldGVkVmFsdWUgPSB0cnVlKSA6IChjb21wbGV0ZWRWYWx1ZSA9IGZhbHNlKTtcbiAgICBNZXRob2RzLnVwZGF0ZVRvZG8oYWN0aXZlS2V5LCB2YWx1ZSwgY29tcGxldGVkVmFsdWUpO1xuICB9XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpc3QtaW5wdXQnKSkge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSAnJykge1xuICAgICAgTWV0aG9kcy51cGRhdGVUb2RvKGFjdGl2ZUtleSwgbmV3VmFsdWUsIGNvbXBsZXRlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICBNZXRob2RzLmRpc3BsYXlUb2RvTGlzdCgpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIFJlbW92ZSBhbGwgY29tcGxldGVkIHRvZG8gaXRlbXNcbmNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBNZXRob2RzLnJlbW92ZUFsbENvbXBsZXRlZCgpO1xufSk7XG4iLCJjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbmNvbnN0IGxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taXRlbScpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pbnB1dCcpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG5jb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlQnRuJyk7XG5jb25zdCBtc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm8tYm9va3MnKTtcbmNvbnN0IHVwZGF0ZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXBkYXRlRm9ybScpO1xuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXJCdG4nKTtcblxuZXhwb3J0IHtcbiAgdG9kb0xpc3QsIGZvcm0sIG1zZywgdG9nZ2xlQnRuLCBsaSwgaW5wdXQsIHVwZGF0ZUZvcm0sIGNsZWFyQnRuLFxufTtcbiIsImltcG9ydCB7IHRvZG9MaXN0LCBtc2cgfSBmcm9tICcuL0RPTUVsZW1lbnRzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0aG9kcyB7XG4gIHN0YXRpYyB0b2RvcyA9IFtdO1xuXG4gIC8qKiAqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgTUFJTiBGVU5DVElPTlNcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuICAvLyBHZXQgQWxsIFRvZG9zIGZyb20gTG9jYWxTdG9yYWdlXG4gIHN0YXRpYyBnZXRUb2RvcygpIHtcbiAgICBjb25zdCBwYXJzZWRUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuICAgIGlmIChwYXJzZWRUb2Rvcykge1xuICAgICAgdGhpcy50b2RvcyA9IHBhcnNlZFRvZG9zO1xuICAgICAgbXNnLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnT29vcHMhISBUaGVyZSBhcmUgbm8gdG9kb3MgYXZhaWxhYmxlJztcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBlbGVtZW50IGZvciBlYWNoIHRvZG8gbGlzdCBpdGVtXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50ID0gKHRvZG8pID0+IHtcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtLmNsYXNzTmFtZSA9ICd0b2RvLWl0ZW0nO1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdrZXknLCB0b2RvLmluZGV4KTtcbiAgICBpdGVtLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpdGVtLSR7dG9kby5pbmRleH1cIiBjbGFzcz1cImNoZWNrSW5wdXRcIiAke1xuICAgICAgdG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJ1xuICAgIH0+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsaXN0LWlucHV0ICR7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA/ICdzdHJpa2V0aHJvdWdoJyA6ICcnXG4gICAgfVwiIHZhbHVlPVwiJHt0b2RvLmRlc2NyaXB0aW9ufVwiPlxuPC9kaXY+XG48YSBocmVmPVwiI1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvZ2dsZUJ0blwiPlxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWVsbGlwc2lzLXZlcnRpY2FsXCI+PC9pPlxuPC9hPlxuYDtcblxuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIG1zZy50ZXh0Q29udGVudCA9ICcnO1xuICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9O1xuXG4gIC8vIERpc3BsYXkgdGhlIGxpc3QgaW4gdGhlIGJyb3dzZXJcbiAgc3RhdGljIGRpc3BsYXlUb2RvTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCBzb3J0ZWRUb2RvcyA9IHRoaXMudG9kb3Muc29ydCgoYSwgYikgPT4gYS5pbmRleCAtIGIuaW5kZXgpO1xuICAgIHNvcnRlZFRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCh0b2RvKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBBZGQgYSBuZXcgdG9kbyB0byB0aGUgYXJyYXlcbiAgc3RhdGljIGFkZFRvZG8gPSAodG9kbykgPT4ge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XG4gIH07XG5cbiAgc3RhdGljIHVwZGF0ZVRvZG8gPSAoa2V5LCB2YWx1ZSwgY29tcGxldGVkVmFsdWUpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRvZG9zLmZpbmQoXG4gICAgICAodG9kbykgPT4gU3RyaW5nKGtleSkgPT09IFN0cmluZyh0b2RvLmluZGV4KSxcbiAgICApO1xuXG4gICAgcmVzdWx0LmRlc2NyaXB0aW9uID0gKHZhbHVlICE9PSAnJykgPyB2YWx1ZSA6IHJlc3VsdC5kZXNjcmlwdGlvbjtcbiAgICByZXN1bHQuY29tcGxldGVkID0gY29tcGxldGVkVmFsdWU7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XG5cbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBhIHRvZG8gZnJvbSB0aGUgYXJyYXlcbiAgc3RhdGljIHJlbW92ZVRvZG8gPSAoa2V5KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy50b2Rvcy5maWx0ZXIoXG4gICAgICAodG9kbykgPT4gU3RyaW5nKGtleSkgIT09IFN0cmluZyh0b2RvLmluZGV4KSxcbiAgICApO1xuXG4gICAgY29uc3QgdXBkYXRlZFRvZG9zID0gcmVzdWx0Lm1hcCgodG9kbywgT2xkaW5kZXgpID0+ICh7XG4gICAgICAuLi50b2RvLFxuICAgICAgaW5kZXg6IE9sZGluZGV4ICsgMSxcbiAgICB9KSk7XG5cbiAgICB0aGlzLnRvZG9zID0gdXBkYXRlZFRvZG9zO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZFRvZG9zKSk7XG5cbiAgICBpZiAoIXVwZGF0ZWRUb2Rvcy5sZW5ndGgpIHtcbiAgICAgIG1zZy50ZXh0Q29udGVudCA9ICdPb29wcyEhIFRoZXJlIGFyZSBubyB0b2RvcyBhdmFpbGFibGUnO1xuICAgICAgbXNnLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgbXNnLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XG4gICAgICBtc2cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIHRoaXMuZGlzcGxheVRvZG9MaXN0KCk7XG4gIH07XG5cbiAgc3RhdGljIHJlbW92ZUFsbENvbXBsZXRlZCA9ICgpID0+IHtcbiAgICBjb25zdCB1bmNvbXBsZXRlZFRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIoXG4gICAgICAodG9kbykgPT4gdG9kby5jb21wbGV0ZWQgPT09IGZhbHNlLFxuICAgICk7XG4gICAgdGhpcy50b2RvcyA9IHVuY29tcGxldGVkVG9kb3M7XG5cbiAgICBpZiAodW5jb21wbGV0ZWRUb2Rvcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRUb2RvcyA9IHVuY29tcGxldGVkVG9kb3MubWFwKCh0b2RvLCBPbGRpbmRleCkgPT4gKHtcbiAgICAgICAgLi4udG9kbyxcbiAgICAgICAgaW5kZXg6IE9sZGluZGV4ICsgMSxcbiAgICAgIH0pKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRUb2RvcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnQWxsIFRhc2tzIENvbXBsZXRlZCc7XG4gICAgICBtc2cuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICBtc2cuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuZGlzcGxheVRvZG9MaXN0KCk7XG4gIH07XG5cbiAgLyoqICoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgRU5EIE9GICBNQUlOIEZVTkNUSU9OU1xuICAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4gIC8vIEdldCBBbGwgbGkgdGFnc1xuICBzdGF0aWMgZ2V0QWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWl0ZW0nKTtcbiAgICByZXR1cm4gbGlzO1xuICB9O1xufVxuIiwiY2xhc3MgVG9kbyB7XHJcbiAgY29uc3RydWN0b3IoaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpIHtcclxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9kbzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=