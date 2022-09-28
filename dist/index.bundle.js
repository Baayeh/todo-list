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

_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [todo] = _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.elements;

  const index = _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].todos.length + 1;
  const description = todo.value;
  const completed = false;

  const newTodo = new _modules_TodoClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](index, description, completed);

  _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].addTodo(newTodo);

  _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(newTodo);
  _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.form.reset();
});

const lis = _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].getAll();

const resetStyle = () => {
  lis.forEach((li) => {
    const inputField = li.firstElementChild.lastElementChild;
    inputField.addEventListener('blur', () => {
      li.style.backgroundColor = 'white';
      inputField.setAttribute('readonly', true);
    });
  });
};

_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_2__.todoList.addEventListener('click', (e) => {
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


/***/ }),

/***/ "./src/modules/DOMElements.js":
/*!************************************!*\
  !*** ./src/modules/DOMElements.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "form": () => (/* binding */ form),
/* harmony export */   "msg": () => (/* binding */ msg),
/* harmony export */   "todoList": () => (/* binding */ todoList)
/* harmony export */ });
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('#form');
const msg = document.querySelector('.no-books');




/***/ }),

/***/ "./src/modules/MethodsClass.js":
/*!*************************************!*\
  !*** ./src/modules/MethodsClass.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Methods),
/* harmony export */   "focus": () => (/* binding */ focus)
/* harmony export */ });
/* harmony import */ var _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMElements.js */ "./src/modules/DOMElements.js");


const focus = false;

class Methods {
  static todos = [];

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

  static getAll = () => {
    const lis = document.querySelectorAll('.todo-item');
    return lis;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDTTtBQUNVOztBQUUxRCw4Q0FBOEMseUVBQWdCOztBQUU5RCwwRUFBcUI7QUFDckI7O0FBRUEsaUJBQWlCLGtFQUFhOztBQUU5QixnQkFBZ0IsNkVBQW9CO0FBQ3BDO0FBQ0E7O0FBRUEsc0JBQXNCLDZEQUFJOztBQUUxQixFQUFFLHdFQUFlOztBQUVqQixFQUFFLDhFQUFxQjtBQUN2QixFQUFFLCtEQUFVO0FBQ1osQ0FBQzs7QUFFRCxZQUFZLHVFQUFjOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBLDhFQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEREO0FBQ0E7QUFDQTs7QUFJRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOK0M7O0FBRWpEOztBQUVlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDREQUFlO0FBQ3JCO0FBQ0EsTUFBTTtBQUNOLE1BQU0sNERBQWU7QUFDckIsTUFBTSxnRUFBbUI7QUFDekIsTUFBTSw4REFBaUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG1EQUFtRCxpQkFBaUIsSUFBSSx3QkFBd0I7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxpRUFBb0I7QUFDeEIsSUFBSSw0REFBZTtBQUNuQixJQUFJLDhEQUFpQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFaUI7Ozs7Ozs7Ozs7Ozs7OztBQy9EakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9NZXRob2RzQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL1RvZG9DbGFzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kbyBmcm9tICcuL21vZHVsZXMvVG9kb0NsYXNzLmpzJztcbmltcG9ydCBNZXRob2RzIGZyb20gJy4vbW9kdWxlcy9NZXRob2RzQ2xhc3MuanMnO1xuaW1wb3J0IHsgZm9ybSwgdG9kb0xpc3QgfSBmcm9tICcuL21vZHVsZXMvRE9NRWxlbWVudHMuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgTWV0aG9kcy5nZXRUb2RvcygpKTtcblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgW3RvZG9dID0gZm9ybS5lbGVtZW50cztcblxuICBjb25zdCBpbmRleCA9IE1ldGhvZHMudG9kb3MubGVuZ3RoICsgMTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSB0b2RvLnZhbHVlO1xuICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcblxuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpO1xuXG4gIE1ldGhvZHMuYWRkVG9kbyhuZXdUb2RvKTtcblxuICBNZXRob2RzLmNyZWF0ZUVsZW1lbnQobmV3VG9kbyk7XG4gIGZvcm0ucmVzZXQoKTtcbn0pO1xuXG5jb25zdCBsaXMgPSBNZXRob2RzLmdldEFsbCgpO1xuXG5jb25zdCByZXNldFN0eWxlID0gKCkgPT4ge1xuICBsaXMuZm9yRWFjaCgobGkpID0+IHtcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gbGkuZmlyc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICBsaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgdHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICByZXNldFN0eWxlKCk7XG4gIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSScpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdrZXknKTtcblxuICAgIGNvbnN0IGZvcm1Db250cm9sID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIGNvbnN0IGZvcm1JbnB1dCA9IGZvcm1Db250cm9sLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgZm9ybUlucHV0LnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICBmb3JtSW5wdXQuZm9jdXMoKTtcbiAgICBjb25zdCBwYXJlbnRPZkZvcm1Db250cm9sID0gZm9ybUNvbnRyb2wucGFyZW50RWxlbWVudDtcbiAgICBwYXJlbnRPZkZvcm1Db250cm9sLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1MSwgMjUxLCAxNzcsIDAuNTA4KSc7XG4gIH1cbn0pO1xuIiwiY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcbmNvbnN0IG1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uby1ib29rcycpO1xuXG5leHBvcnQge1xuICB0b2RvTGlzdCwgZm9ybSwgbXNnLFxufTtcbiIsImltcG9ydCB7IHRvZG9MaXN0LCBtc2cgfSBmcm9tICcuL0RPTUVsZW1lbnRzLmpzJztcblxuY29uc3QgZm9jdXMgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0aG9kcyB7XG4gIHN0YXRpYyB0b2RvcyA9IFtdO1xuXG4gIHN0YXRpYyBnZXRUb2RvcygpIHtcbiAgICBjb25zdCBwYXJzZWRUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuICAgIGlmIChwYXJzZWRUb2Rvcykge1xuICAgICAgdGhpcy50b2RvcyA9IHBhcnNlZFRvZG9zO1xuICAgICAgbXNnLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB0aGlzLmRpc3BsYXlUb2RvTGlzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnT29vcHMhISBUaGVyZSBhcmUgbm8gdG9kb3MgYXZhaWxhYmxlJztcbiAgICAgIG1zZy5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBlbGVtZW50IGZvciBlYWNoIHRvZG8gbGlzdCBpdGVtXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50ID0gKHRvZG8pID0+IHtcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtLmNsYXNzTmFtZSA9ICd0b2RvLWl0ZW0nO1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdrZXknLCB0b2RvLmluZGV4KTtcbiAgICBpdGVtLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpdGVtMVwiICR7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnXG4gICAgfT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxpc3QtaW5wdXRcIiB2YWx1ZT1cIiR7dG9kby5kZXNjcmlwdGlvbn1cIiAke2ZvY3VzID8gJycgOiAncmVhZG9ubHknfT5cbjwvZGl2PlxuPGEgaHJlZj1cIiNcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0b2dnbGVCdG5cIj5cbiAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbFwiPjwvaT5cbjwvYT5cbjxhIGhyZWY9XCIjXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicmVtb3ZlQnRuXCI+XG4gICAgPHN2ZyBjbGFzcz1cInctNiBoLTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk05IDJhMSAxIDAgMDAtLjg5NC41NTNMNy4zODIgNEg0YTEgMSAwIDAwMCAydjEwYTIgMiAwIDAwMiAyaDhhMiAyIDAgMDAyLTJWNmExIDEgMCAxMDAtMmgtMy4zODJsLS43MjQtMS40NDdBMSAxIDAgMDAxMSAySDl6TTcgOGExIDEgMCAwMTIgMHY2YTEgMSAwIDExLTIgMFY4em01LTFhMSAxIDAgMDAtMSAxdjZhMSAxIDAgMTAyIDBWOGExIDEgMCAwMC0xLTF6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbjwvYT5gO1xuXG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgbXNnLnRleHRDb250ZW50ID0gJyc7XG4gICAgbXNnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH07XG5cbiAgLy8gRGlzcGxheSB0aGUgbGlzdCBpbiB0aGUgYnJvd3NlclxuICBzdGF0aWMgZGlzcGxheVRvZG9MaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNvcnRlZFRvZG9zID0gdGhpcy50b2Rvcy5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7XG4gICAgc29ydGVkVG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KHRvZG8pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhIG5ldyB0b2RvIHRvIHRoZSBhcnJheVxuICBzdGF0aWMgYWRkVG9kbyA9ICh0b2RvKSA9PiB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcbiAgfTtcblxuICBzdGF0aWMgZ2V0QWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWl0ZW0nKTtcbiAgICByZXR1cm4gbGlzO1xuICB9XG59XG5cbmV4cG9ydCB7IGZvY3VzIH07XG4iLCJjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IoaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG87Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9