import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put('https://your-api-endpoint/profile', profileData);
  }
}
