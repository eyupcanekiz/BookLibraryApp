import { Component } from '@angular/core';
import { LogoutService } from '../another-navbar/logout.service'; // LogoutService'i import edin
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(
    private logoutService: LogoutService, // LogoutService'i inject edin
    private router: Router
  ) {}

  onLogout(): void {
    this.logoutService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']); // Logout sonrası login sayfasına yönlendirin
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }
}
