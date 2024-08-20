import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {
  menuOpen= false;
  isLoggedIn: boolean=false;
  constructor(private router: Router) {}
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
