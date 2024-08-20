import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl: string = '/api/rate-book';

  constructor(private http: HttpClient) { }

  rateBook(bookId: number, rating: number): Observable<any> {
    const ratingData = { bookId, rating };
    return this.http.post<any>(this.baseUrl, ratingData);
  }
}
