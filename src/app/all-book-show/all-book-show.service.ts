import { Injectable } from "@angular/core"

import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {  commentResponse } from "./commentresponse";
import { commentRequest } from "./comment-request";
import { response } from "express";
export interface AllShowBookDto {
    bookName: string;
  }
@Injectable({
    providedIn: 'root'
  })

export class AllBookShowService{
    private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook';
    private bookUrl = 'https://booklibaryapi.azurewebsites.net/api/Book';


    constructor(private http : HttpClient){}
addBorrowedBook(bookDto: AllShowBookDto, userName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddBorrow?userName=${userName}`, bookDto);
  }
  rateBook(bookId: number, rating: number): Observable<any> {
    const ratingData = { bookId, rating };
    return this.http.post<any>(this.apiUrl, ratingData);
  }
  getComment(bookName:string): Observable<any> {
    return this.http.get<commentResponse[]>(`${this.bookUrl}/getComment/${bookName}`);
  }
  addComment(bookName:string,comment:commentRequest):Observable<any>{
    return this.http.post<any>(`${this.bookUrl}/addComment/${bookName}`,comment).pipe(
      map((response) => {return response})
    )
    
  }
}