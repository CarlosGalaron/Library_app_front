import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  saveUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}