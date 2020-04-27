import { TestBed } from '@angular/core/testing';
import { Todo } from '../models/todo';
import { TodoService } from './todo-service.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAllTodos()', () => {

    //create spies
    beforeEach(() => {
      spyOn(service, 'addTodo').and.callThrough();
    });

    it('should return an empty array by default', () => {
      expect(service.getAllTodos()).toEqual([]);
    });

    it('should return all todo in todoList', () => {
      let todo1 = new Todo({task: 'call the wizard!, Harry', status: false});
      let todo2 = new Todo({task: 'It\`s wingardium leviOsa, not leviosAH.', status: true});

      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.addTodo).toHaveBeenCalled();
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    });
  });

  describe('#saveTodo(todo)', () => {

    // create spies
    beforeEach(() => {
      spyOn(service, 'addTodo').and.callThrough();
    });

    it('should automatically assign and incfement id', () => {
      let todo1 = new Todo({
        task: 'call the wizard!, Harry',
        status: false
      });
      let todo2 = new Todo({
        task: 'It\`s wingardium leviOsa, not leviosAH.',
        status: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.addTodo).toHaveBeenCalledWith(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    });
  });

  describe('#deleteTodoId(id)', () => {

    it('should remove todo with the corresponding ID', () => {
      let todo1 = new Todo({
        task: 'call the wizard!, Harry',
        status: false
      });
      let todo2 = new Todo({
        task: 'It\`s wingardium leviOsa, not leviosAH.',
        status: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    })

    it('should remove todo if todo with corresponding is not present in the list', () => {
      let todo1 = new Todo({
        task: 'call the wizard!, Harry',
        status: false
      });
      let todo2 = new Todo({
        task: 'It\`s wingardium leviOsa, not leviosAH.',
        status: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      // after unsuccessful delete operation the list
      // still remains same as before
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    })
  });

  describe('#updateTodoById(id)', () => {
    beforeEach(() => {
      spyOn(service, 'addTodo').and.callThrough();
    });

    it('should update todo corresponsing to the Id', () => {
      let todo1 = new Todo({
        task: 'call Voldrmort',
        complete: false
      });
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(1, {
        task: 'Tom Riddle'
      });

      expect(updatedTodo.task).toEqual('Tom Riddle');
    });

    it('should return null if todo is not found', () => {
      let todo1 = new Todo({
        task: 'call Voldrmort',
        complete: false
      });
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(4, {
        task: 'Tom Riddle'
      });

      expect(updatedTodo).toEqual(null);
    });
  });

  describe('#toggleTodoStatus(todo)', () => {

    it('should return the updated todo with inverse complete status', () => {
      let todo1 = new Todo({
        task: 'I am a muggle',
        status: false
      });
      service.addTodo(todo1);
      let updatedTodo = service.toggleTodoStatus(todo1);
      expect(updatedTodo.status).toEqual(true);
      service.toggleTodoStatus(todo1);
      expect(updatedTodo.status).toEqual(false);
    });
  });
});
