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
  isbn?: string;
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
  searchBookByTitleAndAuthor(title: string, author: string): Observable<string | null> {
    const query = `${this.googleBooksApiUrl}${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}&key=${this.apiKey}`;
    return this.http.get(query).pipe(
      map((response: any) => {
        if (response.items && response.items.length > 0) {
          const isbnInfo = response.items[0].volumeInfo.industryIdentifiers.find(
            (id: any) => id.type === 'ISBN_13' || id.type === 'ISBN_10'
          );
          return isbnInfo ? isbnInfo.identifier : null;
        }
        return null;
      })
    );
}
   getBookCoverUrl(isbn: string): string {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  }
}
