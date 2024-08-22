import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RateBookRequest, RateBookResultDto } from './star-rating.model'; // Yolu ayarlayın

@Injectable({
  providedIn: 'root'
})
export class StarRatingService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Book'; // Gerçek API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) {}

  rateBook(bookName: string, rating: number, userName: string): Observable<RateBookResultDto> {
    const request: RateBookRequest = { BookName: bookName, Rating: rating };
    return this.http.post<RateBookResultDto>(`${this.apiUrl}/rate-book?userName=${userName}`, request);
  }
}
