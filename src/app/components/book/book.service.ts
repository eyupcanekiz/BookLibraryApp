import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Book {
  id?: any;
  bookName: string;
  publisher: string;
  author: string;
  isAvailable: boolean;
  stock: string;
  coverImageUrl:string;
  category: string
 
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Book';
  private bookGetUrl = 'https://booklibaryapi.azurewebsites.net/api/Book/Name/';
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  private apiKey = 'AIzaSyB1K-WdA9Cef3YOEUmhOnKHbPCostd09Og';

  constructor(private http: HttpClient) {}

  addBook(book: any): Observable<any> {
    const token = localStorage.getItem('AuthToken');
    if (!token) {
      return throwError('User is not authenticated');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Book>(this.apiUrl, book, { headers })
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

  getBookByName(name: any): Observable<Book> {
    const url = `${this.bookGetUrl}/${name}`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteByName(bookName: string): Observable<any> {
    const url = `${this.apiUrl}/${bookName}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
 }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
