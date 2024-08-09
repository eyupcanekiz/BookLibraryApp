import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Book';

  constructor(private http: HttpClient) {}

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book)
      .pipe(
        catchError(this.handleError)
      );
  }

   getBooks(): Observable<Book[]> {
    return this.http.get<{ result: Book[] }>(this.apiUrl).pipe(
      map(response => response.result),  
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
