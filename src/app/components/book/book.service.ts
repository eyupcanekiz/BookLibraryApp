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
  private bookUrl = 'https://booklibaryapi.azurewebsites.net/api/Book';

  constructor(private http: HttpClient) {}

  public getBooks(): Observable<Book[]> {
    return this.http.get<{ result: Book[] }>(this.bookUrl).pipe(
      map(response => response.result),  // Extract result array
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
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
