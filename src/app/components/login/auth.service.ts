import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from './loginModel';  // Doğru yolda olduğundan emin olun

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://booklibaryapi.azurewebsites.net/api/User/LoginUser';
  private tokenUrl = 'https://booklibaryapi.azurewebsites.net/api/User/redis%20get';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    const loginData: LoginModel = { username, password };
    return this.http.post<any>(this.loginUrl, loginData, {
      withCredentials: true // Bu ayar, backend tarafında set edilen cookie'lerin frontend'e gelmesini sağlar
    }).pipe(
      map(response => {
        // Yanıtın içinde token'ı döndürmek için bu kodu kullanabilirsiniz
        return response.token; // Yanıt yapısına göre burayı düzenleyin
      })
    );
  }

  public getToken(): Observable<string> {
    return this.http.get<any>(this.tokenUrl, {
      withCredentials: true
    }).pipe(
      map(response => {
        // Yanıtın içinde token'ı döndürmek için bu kodu kullanabilirsiniz
        return response.token; // Yanıt yapısına göre burayı düzenleyin
      })
    );
  }
}
