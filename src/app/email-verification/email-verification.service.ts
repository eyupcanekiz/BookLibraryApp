import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  private apiUrl = 'https://your-backend-url.com/api/email/send-verification-code'; // Backend API URL'inizi buraya girin

  constructor(private http: HttpClient) {}

  sendVerificationCode(email: string): Observable<any> {
    // E-posta adresini backend'e POST isteği ile gönderiyoruz
    return this.http.post(this.apiUrl, { email });
  }
}
