
import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../login/auth.guard';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  {
  menuOpen= false;
  constructor(private spinner: NgxSpinnerService ,private authGuard: AuthGuard,private router: Router) {}
  isLoggedIn: boolean=false;
  
  ngOnInit() :void {
    this.toggleLogin();
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    
  }
  toggleLogin(){
    this.isLoggedIn=this.authGuard.canActivate();
  }
  toggleMenu(){
    this.menuOpen = !this.menuOpen;
    const floatingButton = document.querySelector('.floating-button');
    if(this.menuOpen){
      floatingButton?.classList.add('open');
    }
    else{
      floatingButton?.classList.remove('open');
    }
  }
  navigateToContact(){
    this.router.navigate(['/contact']);
  }
}
