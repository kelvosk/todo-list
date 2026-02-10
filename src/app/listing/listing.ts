import { Component, inject } from '@angular/core';
import { List } from '../core/services/list';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Todo } from '../core/models/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listing',
  imports: [DatePipe, RouterModule, RouterLink, NgClass],
  templateUrl: './listing.html',
  styleUrl: './listing.scss',
})
export class Listing {
  private listService = inject(List);
  private modalService = inject(NgbModal);

  constructor() {
    console.log(this.listAll());
  }

  listAll() {
    return this.listService.getTodos();
  }

  deleteFromList(idToDelete: string) {
    this.listAll().forEach((item, index) => {
      if (item.id === idToDelete) {
        this.listAll().splice(index, 1);
        console.log(this.listAll);
      }
    });
    this.listService.updateTodo();
    this.modalService.dismissAll();
  }

  completeTodo(todo: Todo, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    this.listService.getTodos().forEach((item, index) => {
      if (item.id === todo?.id) {
        const updatedTodo: Todo = {
          id: todo.id,
          title: todo.title,
          body: todo.body,
          createdAt: todo.createdAt,
          updatedAt: (todo.updatedAt = new Date()),
          status: (todo.status = checked ? 'Completed' : 'Pending'),
        };
        this.listService.getTodos().splice(index, 1, updatedTodo);
        this.listService.updateTodo();
      }
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }
}
