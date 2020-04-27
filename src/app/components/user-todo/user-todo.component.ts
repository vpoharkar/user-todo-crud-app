import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service.service';
import { Todo } from '../../models/todo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-todo',
  templateUrl: './user-todo.component.html',
  styleUrls: ['./user-todo.component.scss'],
  providers: [TodoService]
})
export class UserTodoComponent implements OnInit {

  ngOnInit() { }

  showInput: Boolean = false;
  showStatusInput: Boolean = false;

  title = 'user-todo';
  userTodoForm: FormGroup;
  newTodo: Todo = new Todo();

  constructor(
    private todoDataService: TodoService,
    private formBuilder: FormBuilder
    ) {
    this.userTodoForm = new FormGroup({
      userTask: new FormControl(),
      status: new FormControl(),
    })
  }

  addTodo() {
    if (this.newTodo.id) {
      let values: Object = {
        task: this.userTodoForm.controls['userTask'].value
      };
      this.todoDataService.updateTodoById(this.newTodo.id, values);
    } else {
      this.newTodo.task = this.userTodoForm.controls['userTask'].value;
      this.todoDataService.addTodo(this.newTodo);
    }
    // clear input
    this.newTodo = new Todo();
    this.userTodoForm.controls['userTask'].patchValue('');
    this.showStatusInput = false;
  }

  editTodo(todo) {
    this.showStatusInput = true;
    this.userTodoForm.controls['userTask'].patchValue(todo.task);
    this.newTodo = todo;
  }

  toggleTodoStatus(todo) {
    this.todoDataService.toggleTodoStatus(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
    // clear input
    this.newTodo = new Todo();
    this.userTodoForm.controls['userTask'].patchValue('');
  }

  get todoList() {
    console.log("khfkjhfkjdh: ", this.todoDataService.getAllTodos());
    return this.todoDataService.getAllTodos();
  }

}
