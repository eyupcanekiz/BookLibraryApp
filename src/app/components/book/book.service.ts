import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Book {
  id: any;
  bookName: string;
  publisher: string;
  author: string;
  isAvailable: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookUrl = 'https://booklibaryapi.azurewebsites.net/api/Book'; 
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<Book[]> {
    return this.http.get<{ result: Book[] }>(this.bookUrl).pipe(
      map(response => response.result),  
      catchError(this.handleError)
    );
  }

  public postBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Book>(this.bookUrl, book, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }
}
