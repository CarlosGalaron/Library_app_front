import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';  // Asegúrate de importar tu AuthService
import { Observable, catchError, switchMap, throwError, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Función para obtener las cabeceras con el token del usuario
  private getHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getFirebaseUid().then(async (firebaseUid) => {
      if (firebaseUid) {
        const token = await this.authService.getIdToken();
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Firebase-Uid': firebaseUid,  // Enviar el UID del usuario
        });
        return headers;
      } else {
        throw new Error('Usuario no autenticado');
      }
    }));
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud HTTP:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'));
  }

  // Obtener todos los libros de un usuario
  getBooks(): Observable<any[]> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.get<any[]>(this.apiUrl, { headers })),
      catchError(this.handleError)
    );
  }

  // Añadir un libro
  addBook(book: any): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.post(this.apiUrl, book, { headers })),
      catchError(this.handleError)
    );
  }

  // Eliminar un libro
  deleteBook(bookId: string): Observable<void> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.delete<void>(`${this.apiUrl}/${bookId}`, { headers })),
      catchError(this.handleError)
    );
  }

  // Actualizar un libro
  updateBook(book: any): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.put<any>(`${this.apiUrl}/${book.id}`, book, { headers })),
      catchError(this.handleError)
    );
  }
}