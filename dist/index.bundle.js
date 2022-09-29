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
  const newValue = e.target.value;
  _modules_MethodsClass_js__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(activeKey, newValue);
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
    <input type="checkbox" name="item-${todo.index}" ${
      todo.completed ? 'checked' : ''
    }>
    <input type="text" class="list-input" value="${todo.description}">
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

  // Update Todo
  static updateTodo = (key, value) => {
    const result = this.todos.find(
      (todo) => String(key) === String(todo.index),
    );

    result.description = value;

    localStorage.setItem('todos', JSON.stringify(this.todos));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDTTtBQUNzQjs7QUFFdEUsOENBQThDLHlFQUFnQjs7QUFFOUQ7O0FBRUEsMEVBQXFCO0FBQ3JCOztBQUVBLGlCQUFpQixrRUFBYTs7QUFFOUIsZ0JBQWdCLDZFQUFvQjtBQUNwQztBQUNBOztBQUVBLHNCQUFzQiw2REFBSTs7QUFFMUIsRUFBRSx3RUFBZTs7QUFFakIsRUFBRSwrREFBVTtBQUNaLEVBQUUsOEVBQXFCO0FBQ3ZCLENBQUM7O0FBRUQsWUFBWSx1RUFBYzs7QUFFMUIsOEVBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyRUFBa0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsZ0ZBQTJCO0FBQzNCO0FBQ0EsRUFBRSwyRUFBa0I7QUFDcEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlFOzs7Ozs7Ozs7Ozs7Ozs7O0FDVitDOztBQUVsQztBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSw0REFBZTtBQUNyQjtBQUNBLE1BQU07QUFDTixNQUFNLDREQUFlO0FBQ3JCLE1BQU0sZ0VBQW1CO0FBQ3pCLE1BQU0sOERBQWlCO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQSxLQUFLO0FBQ0wsbURBQW1ELGlCQUFpQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksaUVBQW9CO0FBQ3hCLElBQUksNERBQWU7QUFDbkIsSUFBSSw4REFBaUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQSxNQUFNLDREQUFlO0FBQ3JCLE1BQU0sZ0VBQW1CO0FBQ3pCLE1BQU0sOERBQWlCO0FBQ3ZCLE1BQU0sOERBQWlCO0FBQ3ZCO0FBQ0E7O0FBRUEsSUFBSSwrREFBa0I7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvTWV0aG9kc0NsYXNzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9Ub2RvQ2xhc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG8gZnJvbSAnLi9tb2R1bGVzL1RvZG9DbGFzcy5qcyc7XG5pbXBvcnQgTWV0aG9kcyBmcm9tICcuL21vZHVsZXMvTWV0aG9kc0NsYXNzLmpzJztcbmltcG9ydCB7IGZvcm0sIHRvZG9MaXN0LCB1cGRhdGVGb3JtIH0gZnJvbSAnLi9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIE1ldGhvZHMuZ2V0VG9kb3MoKSk7XG5cbmxldCBhY3RpdmVLZXkgPSBudWxsO1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBbdG9kb10gPSBmb3JtLmVsZW1lbnRzO1xuXG4gIGNvbnN0IGluZGV4ID0gTWV0aG9kcy50b2Rvcy5sZW5ndGggKyAxO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IHRvZG8udmFsdWU7XG4gIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyhpbmRleCwgZGVzY3JpcHRpb24sIGNvbXBsZXRlZCk7XG5cbiAgTWV0aG9kcy5hZGRUb2RvKG5ld1RvZG8pO1xuXG4gIGZvcm0ucmVzZXQoKTtcbiAgTWV0aG9kcy5jcmVhdGVFbGVtZW50KG5ld1RvZG8pO1xufSk7XG5cbmNvbnN0IGxpcyA9IE1ldGhvZHMuZ2V0QWxsKCk7XG5cbnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgLy8gU0VUIEJBQ0tHUk9VTkQgQ09MT1IgT0YgVE9ETyBJVEVNIEFORCBSRVBMQUNFIFRPR0dMRSBCVE4gV0lUSCBERUxFVEUgQlROXG4gIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgcmVzZXRTdHlsZSgpO1xuICAgIGNvbnN0IGxpID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGxpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1MSwgMjUxLCAxNzcsIDAuNTA4KSc7XG4gICAgY29uc3QgYW5jaG9yVGFnID0gbGkubGFzdEVsZW1lbnRDaGlsZDtcblxuICAgIGFjdGl2ZUtleSA9IGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAvLyBjcmVhdGUgZGVsZXRlIGJ1dHRvblxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RlbGV0ZUJ0bicpO1xuICAgIGEuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICBhLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPic7XG5cbiAgICBsaS5yZXBsYWNlQ2hpbGQoYSwgYW5jaG9yVGFnKTtcbiAgfVxuXG4gIC8vIFJFTU9WRSBUT0RPIElURU1cbiAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVCdG4nKSkge1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3Qga2V5ID0gYW5jaG9yVGFnLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdrZXknKTtcbiAgICBNZXRob2RzLnJlbW92ZVRvZG8oa2V5KTtcblxuICAgIGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxufSk7XG5cbi8vIFJFU0VUIEJBQ0tHUk9VTkQgQ09MT1IgT0YgTEkgQU5EIFJFUExBQ0UgREVMRVRFIEJUTiBXSVRIIFRPR0dMRSBCVE5cbmNvbnN0IHJlc2V0U3R5bGUgPSAoKSA9PiB7XG4gIGxpcy5mb3JFYWNoKChsaSkgPT4ge1xuICAgIGxpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgLy8gY3JlYXRlIGRvdHMgYnV0dG9uXG4gICAgY29uc3QgYW5jaG9yVGFnID0gbGkubGFzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2dnbGVCdG4nKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgYS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbFwiPjwvaT4nO1xuICAgIGxpLnJlcGxhY2VDaGlsZChhLCBhbmNob3JUYWcpO1xuICB9KTtcbn07XG5cbi8vIFVQREFURSBUT0RPXG51cGRhdGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gIGNvbnN0IG5ld1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gIE1ldGhvZHMudXBkYXRlVG9kbyhhY3RpdmVLZXksIG5ld1ZhbHVlKTtcbn0pO1xuIiwiY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG5jb25zdCBsaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWl0ZW0nKTtcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaW5wdXQnKTtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybScpO1xuY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZUJ0bicpO1xuY29uc3QgbXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vLWJvb2tzJyk7XG5jb25zdCB1cGRhdGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVwZGF0ZUZvcm0nKTtcblxuZXhwb3J0IHtcbiAgdG9kb0xpc3QsIGZvcm0sIG1zZywgdG9nZ2xlQnRuLCBsaSwgaW5wdXQsIHVwZGF0ZUZvcm0sXG59O1xuIiwiaW1wb3J0IHsgdG9kb0xpc3QsIG1zZyB9IGZyb20gJy4vRE9NRWxlbWVudHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRob2RzIHtcbiAgc3RhdGljIHRvZG9zID0gW107XG5cbiAgLyoqICoqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBNQUlOIEZVTkNUSU9OU1xuICAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4gIC8vIEdldCBBbGwgVG9kb3MgZnJvbSBMb2NhbFN0b3JhZ2VcbiAgc3RhdGljIGdldFRvZG9zKCkge1xuICAgIGNvbnN0IHBhcnNlZFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XG4gICAgaWYgKHBhcnNlZFRvZG9zKSB7XG4gICAgICB0aGlzLnRvZG9zID0gcGFyc2VkVG9kb3M7XG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIHRoaXMuZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZy50ZXh0Q29udGVudCA9ICdPb29wcyEhIFRoZXJlIGFyZSBubyB0b2RvcyBhdmFpbGFibGUnO1xuICAgICAgbXNnLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgbXNnLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XG4gICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGVsZW1lbnQgZm9yIGVhY2ggdG9kbyBsaXN0IGl0ZW1cbiAgc3RhdGljIGNyZWF0ZUVsZW1lbnQgPSAodG9kbykgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGl0ZW0uY2xhc3NOYW1lID0gJ3RvZG8taXRlbSc7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2tleScsIHRvZG8uaW5kZXgpO1xuICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIml0ZW0tJHt0b2RvLmluZGV4fVwiICR7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnXG4gICAgfT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxpc3QtaW5wdXRcIiB2YWx1ZT1cIiR7dG9kby5kZXNjcmlwdGlvbn1cIj5cbjwvZGl2PlxuPGEgaHJlZj1cIiNcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0b2dnbGVCdG5cIj5cbiAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbFwiPjwvaT5cbjwvYT5cbmA7XG5cbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICBtc2cudGV4dENvbnRlbnQgPSAnJztcbiAgICBtc2cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfTtcblxuICAvLyBEaXNwbGF5IHRoZSBsaXN0IGluIHRoZSBicm93c2VyXG4gIHN0YXRpYyBkaXNwbGF5VG9kb0xpc3QgPSAoKSA9PiB7XG4gICAgY29uc3Qgc29ydGVkVG9kb3MgPSB0aGlzLnRvZG9zLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcbiAgICBzb3J0ZWRUb2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQodG9kbyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQWRkIGEgbmV3IHRvZG8gdG8gdGhlIGFycmF5XG4gIHN0YXRpYyBhZGRUb2RvID0gKHRvZG8pID0+IHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvcykpO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSBUb2RvXG4gIHN0YXRpYyB1cGRhdGVUb2RvID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRvZG9zLmZpbmQoXG4gICAgICAodG9kbykgPT4gU3RyaW5nKGtleSkgPT09IFN0cmluZyh0b2RvLmluZGV4KSxcbiAgICApO1xuXG4gICAgcmVzdWx0LmRlc2NyaXB0aW9uID0gdmFsdWU7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIGEgdG9kbyBmcm9tIHRoZSBhcnJheVxuICBzdGF0aWMgcmVtb3ZlVG9kbyA9IChrZXkpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRvZG9zLmZpbHRlcihcbiAgICAgICh0b2RvKSA9PiBTdHJpbmcoa2V5KSAhPT0gU3RyaW5nKHRvZG8uaW5kZXgpLFxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVkVG9kb3MgPSByZXN1bHQubWFwKCh0b2RvLCBPbGRpbmRleCkgPT4gKHtcbiAgICAgIC4uLnRvZG8sXG4gICAgICBpbmRleDogT2xkaW5kZXggKyAxLFxuICAgIH0pKTtcblxuICAgIHRoaXMudG9kb3MgPSB1cGRhdGVkVG9kb3M7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkVG9kb3MpKTtcblxuICAgIGlmICghdXBkYXRlZFRvZG9zLmxlbmd0aCkge1xuICAgICAgbXNnLnRleHRDb250ZW50ID0gJ09vb3BzISEgVGhlcmUgYXJlIG5vIHRvZG9zIGF2YWlsYWJsZSc7XG4gICAgICBtc2cuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICBtc2cuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICAgIG1zZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcbiAgfTtcblxuICAvKiogKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICBFTkQgT0YgIE1BSU4gRlVOQ1RJT05TXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbiAgLy8gR2V0IEFsbCBsaSB0YWdzXG4gIHN0YXRpYyBnZXRBbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xuICAgIHJldHVybiBsaXM7XG4gIH07XG59XG4iLCJjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IoaW5kZXgsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG87Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9