import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { log } from 'console';


@Injectable({
  providedIn: 'root'
})

export class LogoutService  {
    private logoutUrl = 'https://booklibaryapi.azurewebsites.net/api/User/logout';
    constructor(private http: HttpClient) {}


public logout():Observable<Object>{
    localStorage.removeItem("AuthToken")
    return this.http.post(this.logoutUrl,{
    
    }).pipe(
      map(response =>{
        return response
      })
    )
  }
}