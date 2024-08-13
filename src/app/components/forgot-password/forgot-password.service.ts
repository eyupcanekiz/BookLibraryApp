import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { userModel } from "../login/userModel";

@Injectable({
    providedIn: 'root'
})
export class ForgetPasswordService{
    private emailFetchUrl = 'https://booklibaryapi.azurewebsites.net/api/User/GetByEmail/'

    constructor(private http:HttpClient){}
    public getEmail(email:string):Observable<userModel>{
        return this.http.get<userModel>(`${this.emailFetchUrl}${email}`,{
            withCredentials:true,
        });

    }
}