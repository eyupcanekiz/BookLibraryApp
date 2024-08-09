
import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../login/auth.guard';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  {
  constructor(private spinner: NgxSpinnerService ,private authGuard: AuthGuard) {}
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

}
