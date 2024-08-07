import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterModel } from './registerModel';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = 'https://booklibaryapi.azurewebsites.net/api/Register';

  constructor(private http: HttpClient) {}

  public register(data: RegisterModel): Observable<string> {
  //  const data: RegisterModel = { UserName, FullName, Email, Password, PasswordRepeat };

    return this.http.post<any>(this.registerUrl, data).pipe(
      map((response) => {
        return response;
      })
    );
  }
}

