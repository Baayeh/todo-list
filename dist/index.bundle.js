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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDTTtBQUdkOztBQUVsQyw4Q0FBOEMseUVBQWdCOztBQUU5RDs7QUFFQSwwRUFBcUI7QUFDckI7O0FBRUEsaUJBQWlCLGtFQUFhOztBQUU5QixnQkFBZ0IsNkVBQW9CO0FBQ3BDO0FBQ0E7O0FBRUEsc0JBQXNCLDZEQUFJOztBQUUxQixFQUFFLHdFQUFlOztBQUVqQixFQUFFLCtEQUFVO0FBQ1osRUFBRSw4RUFBcUI7QUFDdkIsQ0FBQzs7QUFFRCxZQUFZLHVFQUFjOztBQUUxQiw4RUFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJFQUFrQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxnRkFBMkI7QUFDM0I7O0FBRUE7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBLElBQUksMkVBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLElBQUksMkVBQWtCO0FBQ3RCO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLDhFQUF5QjtBQUN6QixFQUFFLG1GQUEwQjtBQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUU7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYK0M7O0FBRWxDO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDREQUFlO0FBQ3JCO0FBQ0EsTUFBTTtBQUNOLE1BQU0sNERBQWU7QUFDckIsTUFBTSxnRUFBbUI7QUFDekIsTUFBTSw4REFBaUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSyxXQUFXLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksaUVBQW9CO0FBQ3hCLElBQUksNERBQWU7QUFDbkIsSUFBSSw4REFBaUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSSwrREFBa0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQSxNQUFNLDREQUFlO0FBQ3JCLE1BQU0sZ0VBQW1CO0FBQ3pCLE1BQU0sOERBQWlCO0FBQ3ZCLE1BQU0sOERBQWlCO0FBQ3ZCO0FBQ0E7O0FBRUEsSUFBSSwrREFBa0I7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU0sNERBQWU7QUFDckIsTUFBTSxnRUFBbUI7QUFDekIsTUFBTSw4REFBaUI7QUFDdkIsTUFBTSw4REFBaUI7QUFDdkI7QUFDQTs7QUFFQSxJQUFJLCtEQUFrQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvRE9NRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL01ldGhvZHNDbGFzcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvVG9kb0NsYXNzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb2RvIGZyb20gJy4vbW9kdWxlcy9Ub2RvQ2xhc3MuanMnO1xuaW1wb3J0IE1ldGhvZHMgZnJvbSAnLi9tb2R1bGVzL01ldGhvZHNDbGFzcy5qcyc7XG5pbXBvcnQge1xuICBmb3JtLCB0b2RvTGlzdCwgdXBkYXRlRm9ybSwgY2xlYXJCdG4sXG59IGZyb20gJy4vbW9kdWxlcy9ET01FbGVtZW50cy5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBNZXRob2RzLmdldFRvZG9zKCkpO1xuXG5sZXQgYWN0aXZlS2V5ID0gbnVsbDtcblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgW3RvZG9dID0gZm9ybS5lbGVtZW50cztcblxuICBjb25zdCBpbmRleCA9IE1ldGhvZHMudG9kb3MubGVuZ3RoICsgMTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSB0b2RvLnZhbHVlO1xuICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcblxuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpO1xuXG4gIE1ldGhvZHMuYWRkVG9kbyhuZXdUb2RvKTtcblxuICBmb3JtLnJlc2V0KCk7XG4gIE1ldGhvZHMuY3JlYXRlRWxlbWVudChuZXdUb2RvKTtcbn0pO1xuXG5jb25zdCBsaXMgPSBNZXRob2RzLmdldEFsbCgpO1xuXG50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIC8vIFNFVCBCQUNLR1JPVU5EIENPTE9SIE9GIFRPRE8gSVRFTSBBTkQgUkVQTEFDRSBUT0dHTEUgQlROIFdJVEggREVMRVRFIEJUTlxuICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIHJlc2V0U3R5bGUoKTtcbiAgICBjb25zdCBsaSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBsaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTEsIDI1MSwgMTc3LCAwLjUwOCknO1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGxpLmxhc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICBhY3RpdmVLZXkgPSBhbmNob3JUYWcucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2tleScpO1xuXG4gICAgLy8gY3JlYXRlIGRlbGV0ZSBidXR0b25cbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkZWxldGVCdG4nKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgYS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT4nO1xuXG4gICAgbGkucmVwbGFjZUNoaWxkKGEsIGFuY2hvclRhZyk7XG4gIH1cblxuICAvLyBSRU1PVkUgVE9ETyBJVEVNXG4gIGlmIChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlQnRuJykpIHtcbiAgICBjb25zdCBhbmNob3JUYWcgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGtleSA9IGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG4gICAgTWV0aG9kcy5yZW1vdmVUb2RvKGtleSk7XG5cbiAgICBhbmNob3JUYWcucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbn0pO1xuXG4vLyBSRVNFVCBCQUNLR1JPVU5EIENPTE9SIE9GIExJIEFORCBSRVBMQUNFIERFTEVURSBCVE4gV0lUSCBUT0dHTEUgQlROXG5jb25zdCByZXNldFN0eWxlID0gKCkgPT4ge1xuICBsaXMuZm9yRWFjaCgobGkpID0+IHtcbiAgICBsaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIC8vIGNyZWF0ZSBkb3RzIGJ1dHRvblxuICAgIGNvbnN0IGFuY2hvclRhZyA9IGxpLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9nZ2xlQnRuJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgIGEuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWxcIj48L2k+JztcbiAgICBsaS5yZXBsYWNlQ2hpbGQoYSwgYW5jaG9yVGFnKTtcbiAgfSk7XG59O1xuXG4vLyBVUERBVEUgVE9ET1xudXBkYXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICBsZXQgY29tcGxldGVkVmFsdWUgPSBmYWxzZTtcblxuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja0lucHV0JykpIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgIGUudGFyZ2V0LmNoZWNrZWQgPyAoY29tcGxldGVkVmFsdWUgPSB0cnVlKSA6IChjb21wbGV0ZWRWYWx1ZSA9IGZhbHNlKTtcbiAgICBNZXRob2RzLnVwZGF0ZVRvZG8oYWN0aXZlS2V5LCB2YWx1ZSwgY29tcGxldGVkVmFsdWUpO1xuICB9XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpc3QtaW5wdXQnKSkge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgTWV0aG9kcy51cGRhdGVUb2RvKGFjdGl2ZUtleSwgbmV3VmFsdWUsIGNvbXBsZXRlZFZhbHVlKTtcbiAgfVxufSk7XG5cbi8vIFJlbW92ZSBhbGwgY29tcGxldGVkIHRvZG8gaXRlbXNcbmNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBNZXRob2RzLnJlbW92ZUFsbENvbXBsZXRlZCgpO1xufSk7XG4iLCJjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbmNvbnN0IGxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taXRlbScpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pbnB1dCcpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtJyk7XG5jb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlQnRuJyk7XG5jb25zdCBtc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm8tYm9va3MnKTtcbmNvbnN0IHVwZGF0ZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXBkYXRlRm9ybScpO1xuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXJCdG4nKTtcblxuZXhwb3J0IHtcbiAgdG9kb0xpc3QsIGZvcm0sIG1zZywgdG9nZ2xlQnRuLCBsaSwgaW5wdXQsIHVwZGF0ZUZvcm0sIGNsZWFyQnRuLFxufTtcbiIsImltcG9ydCB7IHRvZG9MaXN0LCBtc2cgfSBmcm9tICcuL0RPTUVsZW1lbnRzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0aG9kcyB7XG4gIHN0YXRpYyB0b2RvcyA9IFtdO1xuXG4gIC8qKiAqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgTUFJTiBGVU5DVElPTlNcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuICAvLyBHZXQgQWxsIFRvZG9zIGZyb20gTG9jYWxTdG9yYWdlXG4gIHN0YXRpYyBnZXRUb2RvcygpIHtcbiAgICBjb25zdCBwYXJzZWRUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuICAgIGlmIChwYXJzZWRUb2Rvcykge1xuICAgICAgdGhpcy50b2RvcyA9IHBhcnNlZFRvZG9zO1xuICAgICAgbXNnLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnT29vcHMhISBUaGVyZSBhcmUgbm8gdG9kb3MgYXZhaWxhYmxlJztcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBlbGVtZW50IGZvciBlYWNoIHRvZG8gbGlzdCBpdGVtXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50ID0gKHRvZG8pID0+IHtcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtLmNsYXNzTmFtZSA9ICd0b2RvLWl0ZW0nO1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdrZXknLCB0b2RvLmluZGV4KTtcbiAgICBpdGVtLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpdGVtLSR7dG9kby5pbmRleH1cIiBjbGFzcz1cImNoZWNrSW5wdXRcIiAke1xuICAgICAgdG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJ1xuICAgIH0+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsaXN0LWlucHV0ICR7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA/ICdzdHJpa2V0aHJvdWdoJyA6ICcnXG4gICAgfVwiIHZhbHVlPVwiJHt0b2RvLmRlc2NyaXB0aW9ufVwiPlxuPC9kaXY+XG48YSBocmVmPVwiI1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvZ2dsZUJ0blwiPlxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWVsbGlwc2lzLXZlcnRpY2FsXCI+PC9pPlxuPC9hPlxuYDtcblxuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIG1zZy50ZXh0Q29udGVudCA9ICcnO1xuICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9O1xuXG4gIC8vIERpc3BsYXkgdGhlIGxpc3QgaW4gdGhlIGJyb3dzZXJcbiAgc3RhdGljIGRpc3BsYXlUb2RvTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCBzb3J0ZWRUb2RvcyA9IHRoaXMudG9kb3Muc29ydCgoYSwgYikgPT4gYS5pbmRleCAtIGIuaW5kZXgpO1xuICAgIHNvcnRlZFRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCh0b2RvKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBBZGQgYSBuZXcgdG9kbyB0byB0aGUgYXJyYXlcbiAgc3RhdGljIGFkZFRvZG8gPSAodG9kbykgPT4ge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XG4gIH07XG5cbiAgc3RhdGljIHVwZGF0ZVRvZG8gPSAoa2V5LCB2YWx1ZSwgY29tcGxldGVkVmFsdWUpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRvZG9zLmZpbmQoXG4gICAgICAodG9kbykgPT4gU3RyaW5nKGtleSkgPT09IFN0cmluZyh0b2RvLmluZGV4KSxcbiAgICApO1xuXG4gICAgcmVzdWx0LmRlc2NyaXB0aW9uID0gdmFsdWU7XG4gICAgcmVzdWx0LmNvbXBsZXRlZCA9IGNvbXBsZXRlZFZhbHVlO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvcykpO1xuXG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcbiAgfTtcblxuICAvLyBSZW1vdmUgYSB0b2RvIGZyb20gdGhlIGFycmF5XG4gIHN0YXRpYyByZW1vdmVUb2RvID0gKGtleSkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudG9kb3MuZmlsdGVyKFxuICAgICAgKHRvZG8pID0+IFN0cmluZyhrZXkpICE9PSBTdHJpbmcodG9kby5pbmRleCksXG4gICAgKTtcblxuICAgIGNvbnN0IHVwZGF0ZWRUb2RvcyA9IHJlc3VsdC5tYXAoKHRvZG8sIE9sZGluZGV4KSA9PiAoe1xuICAgICAgLi4udG9kbyxcbiAgICAgIGluZGV4OiBPbGRpbmRleCArIDEsXG4gICAgfSkpO1xuXG4gICAgdGhpcy50b2RvcyA9IHVwZGF0ZWRUb2RvcztcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRUb2RvcykpO1xuXG4gICAgaWYgKCF1cGRhdGVkVG9kb3MubGVuZ3RoKSB7XG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnT29vcHMhISBUaGVyZSBhcmUgbm8gdG9kb3MgYXZhaWxhYmxlJztcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgICAgbXNnLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xuICB9O1xuXG4gIHN0YXRpYyByZW1vdmVBbGxDb21wbGV0ZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgdW5jb21wbGV0ZWRUb2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKFxuICAgICAgKHRvZG8pID0+IHRvZG8uY29tcGxldGVkID09PSBmYWxzZSxcbiAgICApO1xuICAgIHRoaXMudG9kb3MgPSB1bmNvbXBsZXRlZFRvZG9zO1xuXG4gICAgaWYgKHVuY29tcGxldGVkVG9kb3MubGVuZ3RoKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh1bmNvbXBsZXRlZFRvZG9zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZy50ZXh0Q29udGVudCA9ICdBbGwgVGFza3MgQ29tcGxldGVkJztcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgICAgbXNnLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcbiAgfTtcblxuICAvKiogKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICBFTkQgT0YgIE1BSU4gRlVOQ1RJT05TXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbiAgLy8gR2V0IEFsbCBsaSB0YWdzXG4gIHN0YXRpYyBnZXRBbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xuICAgIHJldHVybiBsaXM7XG4gIH07XG59XG4iLCJjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IoaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG87Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9