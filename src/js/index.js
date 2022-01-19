import { getRefs } from './getRefs'
import {itemTemplate} from './todoTamplate'
const refs = getRefs();

console.log(refs.form);
console.log(refs.todoList);

refs.todoList.addEventListener('click', onToDoElement)

let todos = [
    { id: 1, label: 'template text', checked: true },
    { id: 2, label: 'template text', checked: false },
    { id: 3, label: 'template text', checked: false },
    { id: 4, label: 'template text', checked: false },
];

function startRenderToDo() {
    const markUpItems = todos.map((todo) => {
        return itemTemplate(todo)
    });
    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markUpItems.join(''))
};

startRenderToDo()

function deleteToDo(id) {
    todos = todos.filter((todo) => todo.id !== Number(id))
    console.log("delete");
};

function toggleToDoCheck(id) {
    todos = todos.map((todo) =>  todo.id === Number(id) ? { ...todo, checked: !todo.checked } : todo)
    console.log('toggle');
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
        startRenderToDo()
    }
}