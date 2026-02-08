import { Component, inject, Input, OnInit } from '@angular/core';
import { List } from '../core/services/list';
import { Todo } from '../core/models/list';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editing',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './editing.html',
  styleUrl: './editing.scss',
})
export class Editing implements OnInit {
  todo?: Todo;
  private listService = inject(List);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/list']);
        return;
      }

      this.setTodo(id);
      this.fillUpForm();
    });
  }

  todoForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    body: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    status: new FormControl<string>(''),
  });

  onSubmit() {
    if (this.todo) {
      this.listService.getTodos().forEach((item, index) => {
        if (item.id === this.todo?.id) {
          const updatedTodo: Todo = {
            id: this.todo.id,
            title: this.todoForm.get('title')?.value!,
            body: this.todoForm.get('body')?.value!,
            createdAt: this.todo.createdAt,
            updatedAt: new Date(),
            status: this.todo.status,
          };
          this.listService.getTodos().splice(index, 1, updatedTodo);

          this.router.navigate(['/list']);
        }
      });
    }
  }

  setTodo(id: string) {
    this.todo = this.listService.getTodos().find((todo) => todo.id === id);
  }

  fillUpForm() {
    if (!this.todo) return;

    this.todoForm.patchValue({
      title: this.todo.title,
      body: this.todo.body,
      status: this.todo.status,
    });
  }
}
