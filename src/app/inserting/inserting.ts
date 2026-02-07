import { Component, inject } from '@angular/core';
import { List } from '../core/services/list';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../core/models/list';
import { v4 as uuidv4 } from 'uuid';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inserting',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './inserting.html',
  styleUrl: './inserting.scss',
})
export class Inserting {
  private listService = inject(List);
  private router = inject(Router);

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    status: new FormControl(''),
  });

  onSubmit() {
    const todo: Todo = {
      id: uuidv4(),
      title: this.todoForm.get('title')?.value!,
      body: this.todoForm.get('body')?.value!,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'Ongoing',
    };

    this.listService.addTodo(todo);

    this.router.navigate(['/list']);
  }
}
