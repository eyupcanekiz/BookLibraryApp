import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { passwordRequest } from "./password-Request";

@Injectable({
    providedIn:'root'
})
export class ResetPasswordService{
    private resetPasswordUrl="https://booklibaryapi.azurewebsites.net/api/User/UpdatePassword/";

    constructor(private http:HttpClient) {}

    public updatePassword(password:passwordRequest,userName:string):Observable<string>{
        
        return this.http.put<any>(`${this.resetPasswordUrl}${userName}`,password)
    }
}
