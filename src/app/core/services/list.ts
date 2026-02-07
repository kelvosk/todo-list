import { Injectable } from '@angular/core';
import { Todo } from '../models/list';

@Injectable({
  providedIn: 'root',
})
export class List {
  private list: Todo[] = [];

  addTodo(todo: Todo) {
    this.list.push(todo);
  }

  getTodos() {
    return this.list;
  }
}
