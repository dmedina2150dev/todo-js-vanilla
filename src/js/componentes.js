import { Todo } from "../classes";
import { todoList } from '../index';

// TODO Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodosHtml = (todo) => {

    const todoHtml = `
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = todoHtml;


    divTodoList.append(div.firstElementChild); // TODO esto es para mostrar el (li) y no el (div)

    return div;
}

// TODO Eventos
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(event.target.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodosHtml(nuevoTodo);

        txtInput.value = '';
    }

});


divTodoList.addEventListener('click', (event) => {
    // console.log('click');
    // console.log( event.target.localName );
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    // console.log(todoElemento, todoId);

    if (nombreElemento.includes('input')) { // Click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        // console.log( todoList )
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', (event) => {
    todoList.borrarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    // console.log(event.target.text)

    // Tomar el elemento seleccionado
    const filtro = event.target.text;

    // Si el filto viene undefined
    if (!filtro) { return; }

    // Remover la clase selected de todos los filtros
    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    
    // Añadir la clase selected al filtro seleccionado
    event.target.classList.add('selected');


    // recorrer la lista de las tareas 
    for (const elemento of divTodoList.children) {

        // console.log( elemento )
        // remover por defecto la clase hidden y que se muestren todo
        elemento.classList.remove('hidden');

        // Valida si la tarea esta completada
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;

            default:
                break;
        }
    }


});