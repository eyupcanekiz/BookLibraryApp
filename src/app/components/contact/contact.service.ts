import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contactModel } from './contactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Contact/send-email'; // .NET API endpoint
  constructor(private http: HttpClient) {}

  sendContactForm(formData: contactModel): Observable<string> {
    return this.http.post(this.apiUrl, formData, { responseType: 'text' }); // Yanıtı text olarak işle
  }
}
