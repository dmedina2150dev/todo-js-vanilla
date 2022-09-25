import { TodoList, Todo } from './classes';
import { crearTodosHtml } from './js/componentes';
// import { TodoList } from './classes/todo-list.class';
// import { Todo } from './classes/todo.class';
import './styles.css';

export const todoList = new TodoList();

// todoList.todos.forEach(todo  => crearTodosHtml( todo ));
todoList.todos.forEach( crearTodosHtml );

// const tarea = new Todo('Aprender JavaScript');
// todoList.nuevoTodo( tarea ); 
// todoList.todos[0].imprimirClase();
// tarea.completado = true;
// crearTodosHtml( tarea );

// console.log( 'todos', todoList.todos );