export function itemTemplate ({ id, label, checked }) {
    return `<li data-id=${id} class="list-group-item list-group-item-action">
    <label class="todo-label">
    <input class="todo-check" type="checkbox" ${checked ? 'checked' : ''} />
    <span class="todo-text">${label}</span>
    </label>
    <button type="button" class="btn btn-danger">x</button>
</li>`;
}
