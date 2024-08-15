import { HttpClient, HttpParams } from '@angular/common/http';
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

  removeBorrowedBook(userName: string): Observable<any> {

   return this.http.delete<string>( `${this.apiUrl}/RemoveBorrowed?userName=${userName}`);
  
  
  }
  updateBorrowedBook(bookName: string, userName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateBorrowedBook?userName=${userName}`, bookName, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }
  
}
