import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate,Router } from "@angular/router";


@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router :Router,private snackBar : MatSnackBar){}
    
    canActivate() :boolean {
        const token = localStorage.getItem("AuthToken");
        if(token){
            this.snackBar.open("Giriş yapilmiş","Close",{duration:3000});
            this.router.navigate(['/']);
          
            return false;
        }
        return true;
    }

}
