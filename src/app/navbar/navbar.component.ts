import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../components/login/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean | undefined;

  constructor
  (
    private translate: TranslateService,
    private router: Router,
    private authGuard: AuthGuard
  ) 
  {
    this.translate.addLangs(['en', 'tr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
  }

  ngOnInit() 
  {
   this.toggleLogin();
  }

  switchLanguage(lang: string)
  {
    this.translate.use(lang);
  }

  toggleLogin() {
    this.isLoggedIn = !this.authGuard.canActivate();
  
  }

}
