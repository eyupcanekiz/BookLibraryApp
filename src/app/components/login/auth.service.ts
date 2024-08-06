import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from './loginModel';  // Doğru yolda olduğundan emin olun

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/User/LoginUser';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    const loginData: LoginModel = { username, password };
    return this.http.post<any>(`${this.apiUrl}`, loginData);  // '/login' kaldırıldı, çünkü apiUrl zaten login endpointine işaret ediyor.
  }
}
