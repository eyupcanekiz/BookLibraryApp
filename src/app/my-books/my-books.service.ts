import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BorrowBookByNameDto } from "../components/borrowbook/borrowbook.service";

@Injectable({
    providedIn: 'root'
  })
  export class MyBookService {
    private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';
  
    constructor(private http: HttpClient) { }
  
    getBorrowedBooks(userName: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetBorrowBooks?userName=${userName}`);
    }
    getReadOutBooks(userName: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetReadOutByName?userName=${userName}`);
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