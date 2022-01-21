export const getRefs = () => {
    return {
        form: document.querySelector('form'),
        todoList: document.querySelector('.list-group'),
        print: document.querySelector('.btn.btn-success'),
        addToDo: document.querySelector('.btn.btn-primary'),
        // approveDelete: document.querySelector('.btn-delete'),
        // cancelDelete: deleteModal.element().querySelector('.btn-cancel'),
        // approveDelete: deleteModal.element().querySelector('.btn-delete'),
        // cancelDelete: document.querySelector('.btn-cancel'),
    }
}