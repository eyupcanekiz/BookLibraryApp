import { Injectable } from "@angular/core"

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
export interface AllShowBookDto {
    bookName: string;
  }
@Injectable({
    providedIn: 'root'
  })

export class AllBookShowService{
    private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';

    constructor(private http : HttpClient){}
addBorrowedBook(bookDto: AllShowBookDto, userName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddBorrow?userName=${userName}`, bookDto);
  }

}