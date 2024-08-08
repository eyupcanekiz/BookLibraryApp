import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../components/login/auth.guard';
import { AuthService } from '../components/login/auth.service';
import { userModel } from '../components/login/userModel';
import { profile } from 'console';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean | undefined;
  userId:string|undefined;

  constructor
  (
    private translate: TranslateService,
    private router: Router,
    private authGuard: AuthGuard,
    private authService: AuthService
  ) 
  {
    this.translate.addLangs(['en', 'tr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
  }

  ngOnInit() 
  {
    this.getToken();
   this.toggleLogin();
   }

  switchLanguage(lang: string)
  {
    this.translate.use(lang);
  }
  getToken(){
    if(typeof window!=='undefined'){
    const token = localStorage.getItem("AuthToken");
    if (token) {
      this.userId = this.authService.extractUserIdFromToken(token);
    }
    }
  }
  toggleLogin() {
    this.isLoggedIn = this.authGuard.canActivate();
}
  navigateToProfile(){
    if(!this.isLoggedIn && this.userId){
      this.router.navigate(["/profile",this.userId]);
    }
    else{
      this.router.navigate(["/login"]);
    }
  }

}
