import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoginModel } from './loginModel';  // Ensure the path is correct
import { userModel } from './userModel';

interface LoginResponse {
  accessTokenExpireDate: string;
  admin: string;
  authToken:string;
  authenticateResult:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://booklibaryapi.azurewebsites.net/api/User/LoginUser';
  private tokenUrl = 'https://booklibaryapi.azurewebsites.net/api/User/redis%20get';
  private userUrl = 'https://booklibaryapi.azurewebsites.net/api/BorrowBook/user/';
  
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginModel = { username, password };
    return this.http.post<LoginResponse>(this.loginUrl, loginData, {
      withCredentials: true,
    });
  }

  public getToken(): Observable<string> {
    return this.http.get(this.tokenUrl, {
      withCredentials: true,
      responseType: 'text' // Process the response as text
    });
  }

  private extractUserIdFromToken(token: string): string {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload.id; // This should match the key that holds the user ID
  }

  public getById(): Observable<userModel> {
    return this.getToken().pipe(
      map(token => this.extractUserIdFromToken(token)),
      switchMap(userId => this.http.get<userModel>(`${this.userUrl}${userId}`, {
        withCredentials: true,
      }))
    );
  }
}
