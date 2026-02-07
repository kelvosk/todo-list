import { Component, inject } from '@angular/core';
import { List } from '../core/services/list';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Todo } from '../core/models/list';

@Component({
  selector: 'app-listing',
  imports: [DatePipe, RouterModule, RouterLink],
  templateUrl: './listing.html',
  styleUrl: './listing.scss',
})
export class Listing {
  private listService = inject(List);

  constructor() {
    console.log(this.listAll());
  }

  listAll() {
    return this.listService.getTodos();
  }

  deleteFromList(idToDelete: string) {
    this.listAll().forEach((item, index) => {
      if (item.id === idToDelete) this.listAll().splice(index, 1);
    });
  }

  completeTodo(todo: Todo, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    todo.status = checked ? 'completed' : 'pending';
  }
}
