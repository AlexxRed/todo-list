export const getRefs = () => {
    return {
        form: document.querySelector('form'),
        todoList: document.querySelector('.list-group'),
        print: document.querySelector('.btn.btn-success'),
        addToDo: document.querySelector('.btn.btn-primary'),
    }
}