import { v4 as uuidv4 } from 'uuid';
import { getRefs } from './getRefs';
import { itemTemplate } from './todoTamplate';
import toastr from 'toastr';
import * as basicLightbox from 'basiclightbox';

import 'toastr/build/toastr.min.css';
import 'basiclightbox/dist/basicLightbox.min.css';


const deleteModal = basicLightbox.create(`
<div class="delete-modal">
	<h1>Do you really want to delete this task?</h1>
	<p id="text">lorem ipsum</p>
  <button class="btn btn-cancel">Cancel</button>
  <button class="btn btn-delete">Delete</button>
</div>
`);

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
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

const refs = getRefs();
let currentId; 
let currentToDoName;

let todos = [
    { id: '1', label: 'template text', checked: true },
    { id: '2', label: 'template text', checked: false },
    { id: '3', label: 'template text', checked: false },
    { id: '4', label: 'template text', checked: false },
];

function onCancelDeleteToDo() {
    deleteModal.close()
}

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



function saveToDoList() {
    localStorage.setItem('todos', JSON.stringify(todos))
};

function loadToDoList() {
    try {
        todos =JSON.parse(localStorage.getItem('todos')) 
    }
    catch {
        todos = [
    { id: '1', label: 'change your task', checked: true },
];
    }
}

function startRenderToDo() {
    const markUpItems = todos.map((todo) => {
        return itemTemplate(todo)
    });
    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markUpItems.join(''));

    saveToDoList()
};



function deleteToDo(id) {
    deleteModal.show()
    currentId = id

    const cancelDelete = document.querySelector('.btn-cancel');
    const approveDelete = document.querySelector('.btn-delete');
    cancelDelete.addEventListener('click', onCancelDeleteToDo);
    approveDelete.addEventListener('click', onApproveDeleteToDo)

    // console.log("delete");
};

function toggleToDoCheck(id) {
    todos = todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
    toastr.success('Have you already done this?')
    // console.log('toggle');
}

function onToDoElement(e) {
    if (e.target.nodeName === 'UL') {
        console.log('ne tuda tuknul');
        return
    }
    else {
        const { id } = e.target.closest('li').dataset
        switch (e.target.nodeName) {
            case 'BUTTON':
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

function onPrint() {
    console.table(todos);
};

function onSubmit(e) {
    e.preventDefault();
    const { value } = e.target.elements.text;
    if (!value) return;
    // console.log(e.target.elements.text.value);

    const newToDo = {
        id: uuidv4(),
        label: value,
        checked: false,
    };

    todos.push(newToDo);
    refs.form.reset()
    startRenderToDo()
    
}



function startRenderToDoList() {
    loadToDoList()

    refs.todoList.addEventListener('click', onToDoElement);
    refs.print.addEventListener('click', onPrint);
    refs.form.addEventListener('submit', onSubmit);

    startRenderToDo()
}

startRenderToDoList()
toastr.info('Create your Task')

