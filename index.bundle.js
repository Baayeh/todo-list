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

  _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodo(newTodo);

  _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.reset();
  _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(newTodo);
});

const lis = _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].getAll();

_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.todoList.addEventListener('click', (e) => {
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
    _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeTodo(key);

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
    _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(activeKey, newValue, completedValue);
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

    result.description = value;
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
      localStorage.setItem('todos', JSON.stringify(uncompletedTodos));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9NZXRob2RzQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL1RvZG9DbGFzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kbyBmcm9tICcuL21vZHVsZXMvVG9kb0NsYXNzLmpzJztcclxuaW1wb3J0IE1ldGhvZHMgZnJvbSAnLi9tb2R1bGVzL01ldGhvZHNDbGFzcy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZm9ybSwgdG9kb0xpc3QsIHVwZGF0ZUZvcm0sIGNsZWFyQnRuLFxyXG59IGZyb20gJy4vbW9kdWxlcy9ET01FbGVtZW50cy5qcyc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgTWV0aG9kcy5nZXRUb2RvcygpKTtcclxuXHJcbmxldCBhY3RpdmVLZXkgPSBudWxsO1xyXG5cclxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3QgW3RvZG9dID0gZm9ybS5lbGVtZW50cztcclxuXHJcbiAgY29uc3QgaW5kZXggPSBNZXRob2RzLnRvZG9zLmxlbmd0aCArIDE7XHJcbiAgY29uc3QgZGVzY3JpcHRpb24gPSB0b2RvLnZhbHVlO1xyXG4gIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpO1xyXG5cclxuICBNZXRob2RzLmFkZFRvZG8obmV3VG9kbyk7XHJcblxyXG4gIGZvcm0ucmVzZXQoKTtcclxuICBNZXRob2RzLmNyZWF0ZUVsZW1lbnQobmV3VG9kbyk7XHJcbn0pO1xyXG5cclxuY29uc3QgbGlzID0gTWV0aG9kcy5nZXRBbGwoKTtcclxuXHJcbnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAvLyBTRVQgQkFDS0dST1VORCBDT0xPUiBPRiBUT0RPIElURU0gQU5EIFJFUExBQ0UgVE9HR0xFIEJUTiBXSVRIIERFTEVURSBCVE5cclxuICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXHJcbiAgICByZXNldFN0eWxlKCk7XHJcbiAgICBjb25zdCBsaSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIGxpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1MSwgMjUxLCAxNzcsIDAuNTA4KSc7XHJcbiAgICBjb25zdCBhbmNob3JUYWcgPSBsaS5sYXN0RWxlbWVudENoaWxkO1xyXG5cclxuICAgIGFjdGl2ZUtleSA9IGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgna2V5Jyk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGRlbGV0ZSBidXR0b25cclxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBhLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGVsZXRlQnRuJyk7XHJcbiAgICBhLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuICAgIGEuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2hcIj48L2k+JztcclxuXHJcbiAgICBsaS5yZXBsYWNlQ2hpbGQoYSwgYW5jaG9yVGFnKTtcclxuICB9XHJcblxyXG4gIC8vIFJFTU9WRSBUT0RPIElURU1cclxuICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUJ0bicpKSB7XHJcbiAgICBjb25zdCBhbmNob3JUYWcgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gICAgY29uc3Qga2V5ID0gYW5jaG9yVGFnLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdrZXknKTtcclxuICAgIE1ldGhvZHMucmVtb3ZlVG9kbyhrZXkpO1xyXG5cclxuICAgIGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBSRVNFVCBCQUNLR1JPVU5EIENPTE9SIE9GIExJIEFORCBSRVBMQUNFIERFTEVURSBCVE4gV0lUSCBUT0dHTEUgQlROXHJcbmNvbnN0IHJlc2V0U3R5bGUgPSAoKSA9PiB7XHJcbiAgbGlzLmZvckVhY2goKGxpKSA9PiB7XHJcbiAgICBsaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xyXG4gICAgLy8gY3JlYXRlIGRvdHMgYnV0dG9uXHJcbiAgICBjb25zdCBhbmNob3JUYWcgPSBsaS5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGEuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2dnbGVCdG4nKTtcclxuICAgIGEuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xyXG4gICAgYS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbFwiPjwvaT4nO1xyXG4gICAgbGkucmVwbGFjZUNoaWxkKGEsIGFuY2hvclRhZyk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBVUERBVEUgVE9ET1xyXG51cGRhdGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgbGV0IGNvbXBsZXRlZFZhbHVlID0gZmFsc2U7XHJcblxyXG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NoZWNrSW5wdXQnKSkge1xyXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xyXG4gICAgZS50YXJnZXQuY2hlY2tlZCA/IChjb21wbGV0ZWRWYWx1ZSA9IHRydWUpIDogKGNvbXBsZXRlZFZhbHVlID0gZmFsc2UpO1xyXG4gICAgTWV0aG9kcy51cGRhdGVUb2RvKGFjdGl2ZUtleSwgdmFsdWUsIGNvbXBsZXRlZFZhbHVlKTtcclxuICB9XHJcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGlzdC1pbnB1dCcpKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgTWV0aG9kcy51cGRhdGVUb2RvKGFjdGl2ZUtleSwgbmV3VmFsdWUsIGNvbXBsZXRlZFZhbHVlKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gUmVtb3ZlIGFsbCBjb21wbGV0ZWQgdG9kbyBpdGVtc1xyXG5jbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBNZXRob2RzLnJlbW92ZUFsbENvbXBsZXRlZCgpO1xyXG59KTtcclxuIiwiY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcbmNvbnN0IGxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taXRlbScpO1xyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWlucHV0Jyk7XHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xyXG5jb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlQnRuJyk7XHJcbmNvbnN0IG1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uby1ib29rcycpO1xyXG5jb25zdCB1cGRhdGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVwZGF0ZUZvcm0nKTtcclxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXJCdG4nKTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgdG9kb0xpc3QsIGZvcm0sIG1zZywgdG9nZ2xlQnRuLCBsaSwgaW5wdXQsIHVwZGF0ZUZvcm0sIGNsZWFyQnRuLFxyXG59O1xyXG4iLCJpbXBvcnQgeyB0b2RvTGlzdCwgbXNnIH0gZnJvbSAnLi9ET01FbGVtZW50cy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRob2RzIHtcclxuICBzdGF0aWMgdG9kb3MgPSBbXTtcclxuXHJcbiAgLyoqICoqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgIE1BSU4gRlVOQ1RJT05TXHJcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgLy8gR2V0IEFsbCBUb2RvcyBmcm9tIExvY2FsU3RvcmFnZVxyXG4gIHN0YXRpYyBnZXRUb2RvcygpIHtcclxuICAgIGNvbnN0IHBhcnNlZFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XHJcbiAgICBpZiAocGFyc2VkVG9kb3MpIHtcclxuICAgICAgdGhpcy50b2RvcyA9IHBhcnNlZFRvZG9zO1xyXG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1zZy50ZXh0Q29udGVudCA9ICdPb29wcyEhIFRoZXJlIGFyZSBubyB0b2RvcyBhdmFpbGFibGUnO1xyXG4gICAgICBtc2cuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIGVsZW1lbnQgZm9yIGVhY2ggdG9kbyBsaXN0IGl0ZW1cclxuICBzdGF0aWMgY3JlYXRlRWxlbWVudCA9ICh0b2RvKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGl0ZW0uY2xhc3NOYW1lID0gJ3RvZG8taXRlbSc7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgna2V5JywgdG9kby5pbmRleCk7XHJcbiAgICBpdGVtLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIml0ZW0tJHt0b2RvLmluZGV4fVwiIGNsYXNzPVwiY2hlY2tJbnB1dFwiICR7XHJcbiAgICAgIHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJydcclxuICAgIH0+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxpc3QtaW5wdXQgJHtcclxuICAgICAgdG9kby5jb21wbGV0ZWQgPyAnc3RyaWtldGhyb3VnaCcgOiAnJ1xyXG4gICAgfVwiIHZhbHVlPVwiJHt0b2RvLmRlc2NyaXB0aW9ufVwiPlxyXG48L2Rpdj5cclxuPGEgaHJlZj1cIiNcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0b2dnbGVCdG5cIj5cclxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWVsbGlwc2lzLXZlcnRpY2FsXCI+PC9pPlxyXG48L2E+XHJcbmA7XHJcblxyXG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICBtc2cudGV4dENvbnRlbnQgPSAnJztcclxuICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH07XHJcblxyXG4gIC8vIERpc3BsYXkgdGhlIGxpc3QgaW4gdGhlIGJyb3dzZXJcclxuICBzdGF0aWMgZGlzcGxheVRvZG9MaXN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc29ydGVkVG9kb3MgPSB0aGlzLnRvZG9zLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcclxuICAgIHNvcnRlZFRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcclxuICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KHRvZG8pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQWRkIGEgbmV3IHRvZG8gdG8gdGhlIGFycmF5XHJcbiAgc3RhdGljIGFkZFRvZG8gPSAodG9kbykgPT4ge1xyXG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvcykpO1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVUb2RvID0gKGtleSwgdmFsdWUsIGNvbXBsZXRlZFZhbHVlKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRvZG9zLmZpbmQoXHJcbiAgICAgICh0b2RvKSA9PiBTdHJpbmcoa2V5KSA9PT0gU3RyaW5nKHRvZG8uaW5kZXgpLFxyXG4gICAgKTtcclxuXHJcbiAgICByZXN1bHQuZGVzY3JpcHRpb24gPSB2YWx1ZTtcclxuICAgIHJlc3VsdC5jb21wbGV0ZWQgPSBjb21wbGV0ZWRWYWx1ZTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XHJcblxyXG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xyXG4gIH07XHJcblxyXG4gIC8vIFJlbW92ZSBhIHRvZG8gZnJvbSB0aGUgYXJyYXlcclxuICBzdGF0aWMgcmVtb3ZlVG9kbyA9IChrZXkpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudG9kb3MuZmlsdGVyKFxyXG4gICAgICAodG9kbykgPT4gU3RyaW5nKGtleSkgIT09IFN0cmluZyh0b2RvLmluZGV4KSxcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZFRvZG9zID0gcmVzdWx0Lm1hcCgodG9kbywgT2xkaW5kZXgpID0+ICh7XHJcbiAgICAgIC4uLnRvZG8sXHJcbiAgICAgIGluZGV4OiBPbGRpbmRleCArIDEsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy50b2RvcyA9IHVwZGF0ZWRUb2RvcztcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkVG9kb3MpKTtcclxuXHJcbiAgICBpZiAoIXVwZGF0ZWRUb2Rvcy5sZW5ndGgpIHtcclxuICAgICAgbXNnLnRleHRDb250ZW50ID0gJ09vb3BzISEgVGhlcmUgYXJlIG5vIHRvZG9zIGF2YWlsYWJsZSc7XHJcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuICAgICAgbXNnLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XHJcbiAgICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgcmVtb3ZlQWxsQ29tcGxldGVkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdW5jb21wbGV0ZWRUb2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKFxyXG4gICAgICAodG9kbykgPT4gdG9kby5jb21wbGV0ZWQgPT09IGZhbHNlLFxyXG4gICAgKTtcclxuICAgIHRoaXMudG9kb3MgPSB1bmNvbXBsZXRlZFRvZG9zO1xyXG5cclxuICAgIGlmICh1bmNvbXBsZXRlZFRvZG9zLmxlbmd0aCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh1bmNvbXBsZXRlZFRvZG9zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnQWxsIFRhc2tzIENvbXBsZXRlZCc7XHJcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuICAgICAgbXNnLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XHJcbiAgICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKiAqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgRU5EIE9GICBNQUlOIEZVTkNUSU9OU1xyXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gIC8vIEdldCBBbGwgbGkgdGFnc1xyXG4gIHN0YXRpYyBnZXRBbGwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtJyk7XHJcbiAgICByZXR1cm4gbGlzO1xyXG4gIH07XHJcbn1cclxuIiwiY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKGluZGV4LCBkZXNjcmlwdGlvbiwgY29tcGxldGVkKSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==