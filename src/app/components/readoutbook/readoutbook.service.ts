import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadoutBookService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';

  constructor(private http: HttpClient) {}

  getReadOutBooks(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetReadOutByName?id=${userId}`);
  }
}
