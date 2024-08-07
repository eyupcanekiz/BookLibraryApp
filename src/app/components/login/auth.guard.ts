import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate,Router } from "@angular/router";


@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router :Router,private snackBar : MatSnackBar){}
    
    canActivate() :boolean {
        if(typeof window !=='undefined'){
        const token = localStorage.getItem("AuthToken") || null;
        if(token){
            this.snackBar.open("Giriş yapilmiş","Close",{duration:3000});
            
          
            return false;
        }
        }
        return true;
    }

}
