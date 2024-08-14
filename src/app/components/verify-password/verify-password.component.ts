import { Component, OnInit } from '@angular/core';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrl: './verify-password.component.scss'
})
export class VerifyPasswordComponent implements OnInit{
  errorMessage:string ="";
  verificationCode: string ="";
  userName:string="";


  constructor(
    private verificationCodeService :VerificationCodeService,
    private router :Router,
    private route :ActivatedRoute

  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userName = params.get('name')!;

    })
  }
  onSubmit(){
    const correctCode = this.verificationCodeService.getVerificationCode();
    if(this.verificationCode === correctCode){
      alert('Girdiğiniz kod doğru');
      this.router.navigate(["reset-password",this.userName])
    }
    else{
      alert('Girdiginiz kod yanlis,lütfen tekrar deneyiniz');
      this.errorMessage='Girdiginiz kod yanlis,lütfen tekrar deneyiniz';
    }

  }
}
