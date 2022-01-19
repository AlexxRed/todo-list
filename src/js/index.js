import { v4 as uuidv4 } from 'uuid';
import { getRefs } from './getRefs'
import {itemTemplate} from './todoTamplate'
const refs = getRefs();

console.log(refs.form);
console.log(refs.todoList);
console.log(refs.addToDo);


let todos = [
    { id: '1', label: 'template text', checked: true },
    { id: '2', label: 'template text', checked: false },
    { id: '3', label: 'template text', checked: false },
    { id: '4', label: 'template text', checked: false },
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
    todos = todos.filter((todo) => todo.id !== id);
    // console.log("delete");
};

function toggleToDoCheck(id) {
    todos = todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
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


refs.todoList.addEventListener('click', onToDoElement);
refs.print.addEventListener('click', onPrint);
refs.form.addEventListener('submit', onSubmit)