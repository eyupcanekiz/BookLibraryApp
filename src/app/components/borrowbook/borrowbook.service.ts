import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BorrowBookByNameDto {
    bookName: string;
}

@Injectable({
  providedIn: 'root'
})
export class BorrowbookService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';

  constructor(private http: HttpClient) { }

  getBorrowedBooks(userName: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetBorrowBooks?userName=${userName}`);
  }

  addBorrowedBook(bookDto: BorrowBookByNameDto, userName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddBorrow?userName=${userName}`, bookDto);
  }

  removeBorrowedBook(bookDto: BorrowBookByNameDto, userName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/RemoveBorrowed`, { 
      headers: headers, 
      body: bookDto,
      params: { userName: userName } 
    });
  }
  updateBorrowedBook(bookDto: BorrowBookByNameDto, userName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateBorrowedBook?userName=${userName}`, bookDto, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }
  
}
