// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/books']);  // Redirige a la lista de libros
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/books']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
