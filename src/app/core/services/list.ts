import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/list';

@Injectable({
  providedIn: 'root',
})
export class List implements OnInit {
  private list: Todo[] = [];

  ngOnInit(): void {
    this.getTodos();
  }

  addTodo(todo: Todo) {
    this.list.push(todo);
    localStorage.setItem('List', JSON.stringify(this.list));
  }

  getTodos(): Todo[] {
    const todoList = localStorage.getItem('List');
    if (!todoList) {
      return [];
    }

    this.list = JSON.parse(todoList);

    return this.list;
  }

  updateTodo() {
    localStorage.removeItem('List');
    localStorage.setItem('List', JSON.stringify(this.list));
  }
}
