import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../login/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    isLoggedIn: boolean=false;

    constructor(private authGuard: AuthGuard) {}
    ngOnInit(): void {
      this.toggleLogin();

    }
    toggleLogin(){
      this.isLoggedIn=this.authGuard.canActivate();
    }
  }
