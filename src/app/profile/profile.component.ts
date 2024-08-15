import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/login/auth.service';
import { log } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private route:ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router

  ) 
    {}
  
  
  
  userId:string='';
  profileImageUrl: string | ArrayBuffer | null = null;
  avatarUrl: string = '' ;
  userName: string = '';
  fullName: string = '';
  email: string = '';
  id:string='';

  ngOnInit(): void {
   this.spinner.show();
    this.route.paramMap.subscribe(params =>{
      this.userId= params.get('id')!;
    })
    this.checkTokenUser();
    this.getUser();
    

  }
  checkTokenUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const checkUserTokenDate = localStorage.getItem("DateNow");
      const authToken = localStorage.getItem("AuthToken");
  
      if (authToken && checkUserTokenDate) {
        const tokenDate = new Date(checkUserTokenDate).getTime();
        const currentTime = new Date().getTime();
        if (tokenDate - currentTime < 1000) {
          localStorage.removeItem("AuthToken");
          localStorage.removeItem("DateNow");
          this.router.navigate(['/login']);
        }
      } else {
       
      }
    } else {
     
    }
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
      },
      complete: () => {
        this.spinner.hide(); // Tüm veriler yüklendiğinde spinner'ı gizle
      }
      
    });
  }
  navigateToProfileEditPage(){
    if( this.userId){
      this.router.navigate(["/profil-edit",this.userId]);
    }
   
  }
}