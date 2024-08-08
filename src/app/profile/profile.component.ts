import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/login/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  avatarUrl: string = '' ;
  userName: string = '';
  fullName: string = '';
  email: string = '';

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getById().subscribe({
      next: (response) => {
    
        this.userName = response.userName;
        this.fullName = response.fullName;
        this.email = response.email;
        this.avatarUrl = response.avatarUrl;
        
      },
      error: (error) => {
        console.log("Kullanıcı getirilemedi", error);
      }
    });
  }
}
