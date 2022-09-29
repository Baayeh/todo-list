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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvTWV0aG9kc0NsYXNzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9Ub2RvQ2xhc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG8gZnJvbSAnLi9tb2R1bGVzL1RvZG9DbGFzcy5qcyc7XHJcbmltcG9ydCBNZXRob2RzIGZyb20gJy4vbW9kdWxlcy9NZXRob2RzQ2xhc3MuanMnO1xyXG5pbXBvcnQge1xyXG4gIGZvcm0sIHRvZG9MaXN0LCB1cGRhdGVGb3JtLCBjbGVhckJ0bixcclxufSBmcm9tICcuL21vZHVsZXMvRE9NRWxlbWVudHMuanMnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIE1ldGhvZHMuZ2V0VG9kb3MoKSk7XHJcblxyXG5sZXQgYWN0aXZlS2V5ID0gbnVsbDtcclxuXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNvbnN0IFt0b2RvXSA9IGZvcm0uZWxlbWVudHM7XHJcblxyXG4gIGNvbnN0IGluZGV4ID0gTWV0aG9kcy50b2Rvcy5sZW5ndGggKyAxO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gdG9kby52YWx1ZTtcclxuICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKGluZGV4LCBkZXNjcmlwdGlvbiwgY29tcGxldGVkKTtcclxuXHJcbiAgTWV0aG9kcy5hZGRUb2RvKG5ld1RvZG8pO1xyXG5cclxuICBmb3JtLnJlc2V0KCk7XHJcbiAgTWV0aG9kcy5jcmVhdGVFbGVtZW50KG5ld1RvZG8pO1xyXG59KTtcclxuXHJcbmNvbnN0IGxpcyA9IE1ldGhvZHMuZ2V0QWxsKCk7XHJcblxyXG50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgLy8gU0VUIEJBQ0tHUk9VTkQgQ09MT1IgT0YgVE9ETyBJVEVNIEFORCBSRVBMQUNFIFRPR0dMRSBCVE4gV0lUSCBERUxFVEUgQlROXHJcbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxyXG4gICAgcmVzZXRTdHlsZSgpO1xyXG4gICAgY29uc3QgbGkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICBsaS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTEsIDI1MSwgMTc3LCAwLjUwOCknO1xyXG4gICAgY29uc3QgYW5jaG9yVGFnID0gbGkubGFzdEVsZW1lbnRDaGlsZDtcclxuXHJcbiAgICBhY3RpdmVLZXkgPSBhbmNob3JUYWcucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2tleScpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxldGUgYnV0dG9uXHJcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RlbGV0ZUJ0bicpO1xyXG4gICAgYS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XHJcbiAgICBhLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPic7XHJcblxyXG4gICAgbGkucmVwbGFjZUNoaWxkKGEsIGFuY2hvclRhZyk7XHJcbiAgfVxyXG5cclxuICAvLyBSRU1PVkUgVE9ETyBJVEVNXHJcbiAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVCdG4nKSkge1xyXG4gICAgY29uc3QgYW5jaG9yVGFnID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgIGNvbnN0IGtleSA9IGFuY2hvclRhZy5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgna2V5Jyk7XHJcbiAgICBNZXRob2RzLnJlbW92ZVRvZG8oa2V5KTtcclxuXHJcbiAgICBhbmNob3JUYWcucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gUkVTRVQgQkFDS0dST1VORCBDT0xPUiBPRiBMSSBBTkQgUkVQTEFDRSBERUxFVEUgQlROIFdJVEggVE9HR0xFIEJUTlxyXG5jb25zdCByZXNldFN0eWxlID0gKCkgPT4ge1xyXG4gIGxpcy5mb3JFYWNoKChsaSkgPT4ge1xyXG4gICAgbGkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcclxuICAgIC8vIGNyZWF0ZSBkb3RzIGJ1dHRvblxyXG4gICAgY29uc3QgYW5jaG9yVGFnID0gbGkubGFzdEVsZW1lbnRDaGlsZDtcclxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBhLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9nZ2xlQnRuJyk7XHJcbiAgICBhLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuICAgIGEuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWxcIj48L2k+JztcclxuICAgIGxpLnJlcGxhY2VDaGlsZChhLCBhbmNob3JUYWcpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gVVBEQVRFIFRPRE9cclxudXBkYXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gIGxldCBjb21wbGV0ZWRWYWx1ZSA9IGZhbHNlO1xyXG5cclxuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja0lucHV0JykpIHtcclxuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcclxuICAgIGUudGFyZ2V0LmNoZWNrZWQgPyAoY29tcGxldGVkVmFsdWUgPSB0cnVlKSA6IChjb21wbGV0ZWRWYWx1ZSA9IGZhbHNlKTtcclxuICAgIE1ldGhvZHMudXBkYXRlVG9kbyhhY3RpdmVLZXksIHZhbHVlLCBjb21wbGV0ZWRWYWx1ZSk7XHJcbiAgfVxyXG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpc3QtaW5wdXQnKSkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIE1ldGhvZHMudXBkYXRlVG9kbyhhY3RpdmVLZXksIG5ld1ZhbHVlLCBjb21wbGV0ZWRWYWx1ZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIFJlbW92ZSBhbGwgY29tcGxldGVkIHRvZG8gaXRlbXNcclxuY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgTWV0aG9kcy5yZW1vdmVBbGxDb21wbGV0ZWQoKTtcclxufSk7XHJcbiIsImNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xyXG5jb25zdCBsaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWl0ZW0nKTtcclxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pbnB1dCcpO1xyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0nKTtcclxuY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZUJ0bicpO1xyXG5jb25zdCBtc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm8tYm9va3MnKTtcclxuY29uc3QgdXBkYXRlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGRhdGVGb3JtJyk7XHJcbmNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyQnRuJyk7XHJcblxyXG5leHBvcnQge1xyXG4gIHRvZG9MaXN0LCBmb3JtLCBtc2csIHRvZ2dsZUJ0biwgbGksIGlucHV0LCB1cGRhdGVGb3JtLCBjbGVhckJ0bixcclxufTtcclxuIiwiaW1wb3J0IHsgdG9kb0xpc3QsIG1zZyB9IGZyb20gJy4vRE9NRWxlbWVudHMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0aG9kcyB7XHJcbiAgc3RhdGljIHRvZG9zID0gW107XHJcblxyXG4gIC8qKiAqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBNQUlOIEZVTkNUSU9OU1xyXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gIC8vIEdldCBBbGwgVG9kb3MgZnJvbSBMb2NhbFN0b3JhZ2VcclxuICBzdGF0aWMgZ2V0VG9kb3MoKSB7XHJcbiAgICBjb25zdCBwYXJzZWRUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xyXG4gICAgaWYgKHBhcnNlZFRvZG9zKSB7XHJcbiAgICAgIHRoaXMudG9kb3MgPSBwYXJzZWRUb2RvcztcclxuICAgICAgbXNnLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuZGlzcGxheVRvZG9MaXN0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtc2cudGV4dENvbnRlbnQgPSAnT29vcHMhISBUaGVyZSBhcmUgbm8gdG9kb3MgYXZhaWxhYmxlJztcclxuICAgICAgbXNnLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICBtc2cuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBlbGVtZW50IGZvciBlYWNoIHRvZG8gbGlzdCBpdGVtXHJcbiAgc3RhdGljIGNyZWF0ZUVsZW1lbnQgPSAodG9kbykgPT4ge1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBpdGVtLmNsYXNzTmFtZSA9ICd0b2RvLWl0ZW0nO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2tleScsIHRvZG8uaW5kZXgpO1xyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJpdGVtLSR7dG9kby5pbmRleH1cIiBjbGFzcz1cImNoZWNrSW5wdXRcIiAke1xyXG4gICAgICB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnXHJcbiAgICB9PlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsaXN0LWlucHV0ICR7XHJcbiAgICAgIHRvZG8uY29tcGxldGVkID8gJ3N0cmlrZXRocm91Z2gnIDogJydcclxuICAgIH1cIiB2YWx1ZT1cIiR7dG9kby5kZXNjcmlwdGlvbn1cIj5cclxuPC9kaXY+XHJcbjxhIGhyZWY9XCIjXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidG9nZ2xlQnRuXCI+XHJcbiAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbFwiPjwvaT5cclxuPC9hPlxyXG5gO1xyXG5cclxuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gICAgbXNnLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBtc2cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9O1xyXG5cclxuICAvLyBEaXNwbGF5IHRoZSBsaXN0IGluIHRoZSBicm93c2VyXHJcbiAgc3RhdGljIGRpc3BsYXlUb2RvTGlzdCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNvcnRlZFRvZG9zID0gdGhpcy50b2Rvcy5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7XHJcbiAgICBzb3J0ZWRUb2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XHJcbiAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCh0b2RvKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEFkZCBhIG5ldyB0b2RvIHRvIHRoZSBhcnJheVxyXG4gIHN0YXRpYyBhZGRUb2RvID0gKHRvZG8pID0+IHtcclxuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgdXBkYXRlVG9kbyA9IChrZXksIHZhbHVlLCBjb21wbGV0ZWRWYWx1ZSkgPT4ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy50b2Rvcy5maW5kKFxyXG4gICAgICAodG9kbykgPT4gU3RyaW5nKGtleSkgPT09IFN0cmluZyh0b2RvLmluZGV4KSxcclxuICAgICk7XHJcblxyXG4gICAgcmVzdWx0LmRlc2NyaXB0aW9uID0gdmFsdWU7XHJcbiAgICByZXN1bHQuY29tcGxldGVkID0gY29tcGxldGVkVmFsdWU7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvcykpO1xyXG5cclxuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcclxuICB9O1xyXG5cclxuICAvLyBSZW1vdmUgYSB0b2RvIGZyb20gdGhlIGFycmF5XHJcbiAgc3RhdGljIHJlbW92ZVRvZG8gPSAoa2V5KSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRvZG9zLmZpbHRlcihcclxuICAgICAgKHRvZG8pID0+IFN0cmluZyhrZXkpICE9PSBTdHJpbmcodG9kby5pbmRleCksXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZWRUb2RvcyA9IHJlc3VsdC5tYXAoKHRvZG8sIE9sZGluZGV4KSA9PiAoe1xyXG4gICAgICAuLi50b2RvLFxyXG4gICAgICBpbmRleDogT2xkaW5kZXggKyAxLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMudG9kb3MgPSB1cGRhdGVkVG9kb3M7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZFRvZG9zKSk7XHJcblxyXG4gICAgaWYgKCF1cGRhdGVkVG9kb3MubGVuZ3RoKSB7XHJcbiAgICAgIG1zZy50ZXh0Q29udGVudCA9ICdPb29wcyEhIFRoZXJlIGFyZSBubyB0b2RvcyBhdmFpbGFibGUnO1xyXG4gICAgICBtc2cuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xyXG4gICAgICBtc2cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIHRoaXMuZGlzcGxheVRvZG9MaXN0KCk7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHJlbW92ZUFsbENvbXBsZXRlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHVuY29tcGxldGVkVG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcihcclxuICAgICAgKHRvZG8pID0+IHRvZG8uY29tcGxldGVkID09PSBmYWxzZSxcclxuICAgICk7XHJcbiAgICB0aGlzLnRvZG9zID0gdW5jb21wbGV0ZWRUb2RvcztcclxuXHJcbiAgICBpZiAodW5jb21wbGV0ZWRUb2Rvcy5sZW5ndGgpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodW5jb21wbGV0ZWRUb2RvcykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbXNnLnRleHRDb250ZW50ID0gJ0FsbCBUYXNrcyBDb21wbGV0ZWQnO1xyXG4gICAgICBtc2cuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgIG1zZy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xyXG4gICAgICBtc2cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdGhpcy5kaXNwbGF5VG9kb0xpc3QoKTtcclxuICB9O1xyXG5cclxuICAvKiogKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgIEVORCBPRiAgTUFJTiBGVU5DVElPTlNcclxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAvLyBHZXQgQWxsIGxpIHRhZ3NcclxuICBzdGF0aWMgZ2V0QWxsID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xyXG4gICAgcmV0dXJuIGxpcztcclxuICB9O1xyXG59XHJcbiIsImNsYXNzIFRvZG8ge1xyXG4gIGNvbnN0cnVjdG9yKGluZGV4LCBkZXNjcmlwdGlvbiwgY29tcGxldGVkKSB7XHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZG87Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9