import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    title: 'Todos',
    loadComponent: () => import('./listing/listing').then((c) => c.Listing), //lazy loading
  },
  {
    path: 'create',
    title: 'Add a new Todo',
    loadComponent: () => import('./inserting/inserting').then((c) => c.Inserting),
  },
  {
    path: 'edit/:id',
    title: 'Edit a todo',
    loadComponent: () => import('./editing/editing').then((c) => c.Editing),
  },
];
