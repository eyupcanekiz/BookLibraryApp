import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate,CanDeactivate,Router } from "@angular/router";


@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router :Router,private snackBar : MatSnackBar){}
    
    canActivate() :boolean {
        if(typeof window !=='undefined'){
        const token = localStorage.getItem("AuthToken") || null;
        if(token){
             return false;
        }
        }
        return true;
    }

}
export interface CanComponentDeactivate {
    canDeactivate: () => boolean;
}

export class NoAuthGuard implements CanActivate{
    constructor(private router:Router) {}
    canActivate():boolean {
        if(typeof window !=='undefined'){
            const token = localStorage.getItem("AuthToken") ||null;
            if(!token){
                
                return true
            }
        }
        return false;
    }
}
