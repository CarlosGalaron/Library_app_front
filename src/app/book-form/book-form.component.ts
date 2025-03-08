// src/app/book-form/book-form.component.ts
import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  title = '';
  author = '';
  state = 'pendiente';

  constructor(private bookService: BookService, private router: Router) {}

  async addBook() {
    const newBook = { title: this.title, author: this.author, state: this.state, is_favourite: false };
    try {
      await this.bookService.addBook(newBook).toPromise();  // Convertir Observable a Promise
      this.router.navigate(['/books']);  // Redirigir después de añadir el libro
    } catch (error) {
      console.error('Error al agregar el libro', error);
    }
  }
}
