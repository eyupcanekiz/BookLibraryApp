import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'console';
import { LogoutService } from './logout.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-another-navbar',
  templateUrl: './another-navbar.component.html',
  styleUrl: './another-navbar.component.scss'
})

export class AnotherNavbarComponent  {
  constructor
  (
    private logoutService : LogoutService,
    private snackBar: MatSnackBar,
    private router : Router,
    private translate: TranslateService,
  )
  {
    this.translate.addLangs(['en', 'tr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
  }

  toogleLogout()
  {
    this.logoutService.logout().subscribe({
      next:(response) =>{
        this.snackBar.open("Oturum başarili bir şekilde kapatildi","Close",{duration:3000});
      },
      error:(error)=>{
        this.snackBar.open("Oturum Kapatilamadi","Close",{duration:3000});
        console.error("Logout Failed" ,error)
      }
    })
  }
  switchLanguage(lang: string)
  {
  this.translate.use(lang);
  }
}
