import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/login/auth.service';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private route:ActivatedRoute) {}
  userId:string='';
  profileImageUrl: string | ArrayBuffer | null = null;



  avatarUrl: string = '' ;

  userName: string = '';
  fullName: string = '';
  email: string = '';
  id:string='';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.userId= params.get('id')!;
    })
    this.getUser();
   
  }

  getUser() {
    this.authService.getById(this.userId).subscribe({
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
