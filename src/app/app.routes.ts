// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';  // Ejemplo de componente
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';  // Importa el guard
import { BookFormComponent } from './book-form/book-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'books', component: BookListComponent, canActivate: [authGuard] },
    { path: 'add-book', component: BookFormComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
