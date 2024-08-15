import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class MyBookService {
    private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';
  
    constructor(private http: HttpClient) { }
  
    getBorrowedBooks(userName: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetBorrowBooks?userName=${userName}`);
    }
}