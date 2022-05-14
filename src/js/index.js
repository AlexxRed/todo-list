// ================== make imports ==================
import { v4 as uuidv4 } from 'uuid';
import { getRefs } from './getRefs';
import { itemTemplate } from './todoTamplate';
import toastr from 'toastr';
import * as basicLightbox from 'basiclightbox';

// ================== style import ==================
import 'toastr/build/toastr.min.css';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = getRefs();

// ================== variables ==================
let currentId; 
let currentToDoName;
let currentWarninigName;

// ================== make modal ==================
const deleteModal = basicLightbox.create(`
<div class="delete-modal">
	<h1>Do you really want to delete this task?</h1>
	<p id="text" class="modal-text">item</p>
<button class="btn btn-cancel btn-success">Cancel</button>
<button class="btn btn-delete btn-danger">Delete</button>
</div>
`);

// ================== options ==================
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// ================== user template ==================
let todos = [
    { id: '1', label: 'delete this task and create your own', checked: true },
    { id: '2', label: 'delete this task and create your own', checked: false },
];

// ================== cancel delete ==================
function onCancelDeleteToDo() {
    deleteModal.close()
}

// ================== finish delete==================
function onApproveDeleteToDo() {
    todos.map((todo) => {
        if (todo.id === currentId) {
            currentToDoName = todo.label
        }
    })
    todos = todos.filter((todo) => todo.id !== currentId);
    deleteModal.close()
    startRenderToDo()
    toastr.warning(`Your task - "${currentToDoName}" delete`)
}

// ================== save data in local ==================
function saveToDoList() {
    localStorage.setItem('todos', JSON.stringify(todos))
};

// ================== data loading ==================
function loadToDoList() {
    try {
        todos = JSON.parse(localStorage.getItem('todos')) || []
    } catch (e) {
        toastr.error('Data not loaded')
        return todos = [{ id: '1', label: 'template text', checked: true },]
    }
}

// ================== render todos ==================
function startRenderToDo() {
    const markUpItems = todos.map((todo) => {
        return itemTemplate(todo)
    });
    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markUpItems.join(''));

    saveToDoList()
};

// ================== try delete ==================
function deleteToDo(id) {
    
    todos.map((todo) => {
        if (todo.id === id) {
            currentWarninigName = todo.label
        }
    })
    toastr.error(`Do You want delete ${currentWarninigName}?`)

    deleteModal.show()
    currentId = id
    
    const modalText = document.querySelector('#text')
    const cancelDelete = document.querySelector('.btn-cancel');
    const approveDelete = document.querySelector('.btn-delete');

    modalText.textContent = currentWarninigName
    cancelDelete.addEventListener('click', onCancelDeleteToDo);
    approveDelete.addEventListener('click', onApproveDeleteToDo)
};

// ================== checked status ==================
function toggleToDoCheck(id) {
    todos = todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
    toastr.success('Have you already done this?')
    // console.log('toggle');
}

// ================== click on elements ==================
function onToDoElement(e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName === 'UL') {
        console.log('ne tuda tuknul');
        return
    }
    else {
        const { id } = e.target.closest('li').dataset
        switch (e.target.nodeName) {
            case 'BUTTON':
            case 'B':
                deleteToDo(id);
                break;
            case 'INPUT':
            case 'LABEL':
            case 'LI':
            case 'SPAN':
                toggleToDoCheck(id);
                break;
        }
        startRenderToDo();
    };
}

// ================== print ==================
function onPrint() {
    console.table(todos);
};

// ================== add new todo ==================
function onSubmit(e) {
    e.preventDefault();
    const { value } = e.target.elements.text;

    if (!value) {
        toastr.info('Write the task you plan to do and then click - Add todo')
        return;
    } 
    // console.log(e.target.elements.text.value);

    const newToDo = {
        id: uuidv4(),
        label: value,
        checked: false,
    };

    todos.push(newToDo);
    refs.form.reset()
    startRenderToDo()
    toastr.info(`Your task "${value}" created`)
    
}

// ================== start program ==================
function startRenderToDoList() {
    loadToDoList()
    refs.todoList.addEventListener('click', onToDoElement);
    refs.print.addEventListener('click', onPrint);
    refs.form.addEventListener('submit', onSubmit);
    startRenderToDo()
}

startRenderToDoList()
toastr.info('Create your Task')






