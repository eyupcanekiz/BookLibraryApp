import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/components/login/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (user && user.isAdmin) {
          return true; 
        } else {
          this.router.navigate(['/not-authorized']); // Yetkisiz kullanıcıları yönlendirin
          return false;
        }
      })
    );
  }
}

