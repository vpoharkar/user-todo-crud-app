import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new Todo({
      task: 'hello',
      status: true
    });
    expect(todo.task).toEqual('hello');
    expect(todo.status).toEqual(true);
  });
});
