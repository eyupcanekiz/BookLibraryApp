import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/login/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  profileImageUrl: string | ArrayBuffer | null = null;
  userName: string = '';
  fullName: string = '';
  email: string = '';

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getById().subscribe({
      next: (response) => {
        console.log("User bilgileri", response);
        this.userName = response.userName;
        this.fullName = response.fullName;
        this.email = response.email;
        
      },
      error: (error) => {
        console.log("Kullanıcı getirilemedi", error);
      }
    });
  }
}
