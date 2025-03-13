import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[''] = [''];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        console.log(books); // Depuración: Verifica la estructura de la respuesta
        // Si books es un objeto, conviértelo en un array
        this.books = Array.isArray(books) ? books : Object.values(books);
      },
      error: (error) => {
        console.error('Error al cargar los libros', error);
      }
    });
  }



  async deleteBook(bookId: string) {
    try {
      await this.bookService.deleteBook(bookId);
      await this.loadBooks();
    } catch (error) {
      console.error('Error al eliminar el libro', error);
    }
  }

  toggleBookState(book: any): void {
    this.bookService.toggleBookState(book.id).subscribe(
      () => {
        book.state = book.state === 'pendiente' ? 'leído' : 'pendiente';
      },
      (error) => console.error('Error al cambiar el estado del libro', error)
    );
  }

  toggleFavorite(book: any): void {
    this.bookService.toggleFavorite(book.id).subscribe(
      () => {
        book.is_favourite = !book.is_favourite;
      },
      (error) => console.error('Error al marcar como favorito', error)
    );
  }

}
