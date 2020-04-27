import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //instance that hold last id so that keep trace of
  // automatic increments of ids
  lastId: number = 0;

  //instance of list of todos
  todoList: Todo[] = [];

  constructor() { }

  // POST to /todoList
  addTodo(todo: Todo): TodoService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todoList.push(todo);
    return this;
  }

  // DELETE /todoList/:id
  deleteTodoById(id: number): TodoService {
    this.todoList = this.todoList
      .filter(todo => todo.id !== id);
    return this;
  }

  //  PUT /todoList/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // GET /todoList
  getAllTodos(): Todo[] {
    return this.todoList;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todoList
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo status
  toggleTodoStatus(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      status: !todo.status
    });
    return updatedTodo;
  }
}
