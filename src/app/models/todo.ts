export class Todo {
  id: number;
  task: string = '';
  status: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
