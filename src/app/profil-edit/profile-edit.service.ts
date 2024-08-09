import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterModel } from "../components/register/registerModel";
import { map, Observable } from "rxjs";
import { response } from "express";
import { ProfileEditModel } from "./profile-edit.model";


// {
//     "userName": "string",
//     "fullName": "string",
//     "password": "string",
//     "email": "string"
//   }


@Injectable({
    providedIn:'root',
})
export class ProfileEditService{
    private profileEditUrl ='https://booklibaryapi.azurewebsites.net/api/User/UpdateUser';

    constructor(private http:HttpClient){}

    public profileEdit(data:ProfileEditModel, userId:string):Observable<string>{

        return this.http.put<any>(`${this.profileEditUrl}/${userId}`,data).pipe(
            map((response)=>{
                return response;
            })
        );
    }
        }
