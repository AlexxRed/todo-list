import { getRefs } from './getRefs'
import {itemTemplate} from './todoTamplate'
const refs = getRefs();

console.log(refs.form);
console.log(refs.todoList);


let todos = [
    { id: 1, label: 'template text', checked: true },
    { id: 1, label: 'template text', checked: false },
    { id: 1, label: 'template text', checked: false },
    { id: 1, label: 'template text', checked: false },
];

function startRenderToDo(todos) {
    const markUpItems = todos.map((todo) => {
        return itemTemplate(todo)
    });
    console.log(markUpItems);
    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markUpItems.join(''))
};

startRenderToDo(todos)