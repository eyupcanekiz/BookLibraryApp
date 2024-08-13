import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../book/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowbookService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';

  constructor(private http: HttpClient) { }

  getBorrowedBooks(userId: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/GetBorrowBooks?id=${userId}`);
  }

  addBorrowedBook(bookId: string, userId: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/AddBorrow?id=${userId}`, { Id: bookId });
  }

  removeBorrowedBook(userId: string, bookId: string): Observable<any> {
    const url = `${this.apiUrl}/RemoveBorrowed/${userId}`;
    return this.http.delete(url, { 
      body: { 
        id : bookId  // JSON verisinin doğru formatta olduğundan emin olun
      } 
    });
  }
  
}
