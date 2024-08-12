import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Contact/sendverify-email'; 

  constructor(private http: HttpClient) {}

  sendVerificationCode(emailData: any): Observable<any> {

    return this.http.post(this.apiUrl,  emailData,{ responseType: 'text' } );
  }
}