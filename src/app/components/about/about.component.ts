import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService ){}
  ngOnInit() :void{
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
