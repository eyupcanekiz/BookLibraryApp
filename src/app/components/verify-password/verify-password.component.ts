import { Component } from '@angular/core';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrl: './verify-password.component.scss'
})
export class VerifyPasswordComponent {
  errorMessage:string ="";
  verificationCode: string ="";

  constructor(
    private verificationCodeService :VerificationCodeService,
    private router :Router

  ){}
  onSubmit(){
    const correctCode = this.verificationCodeService.getVerificationCode();
    if(this.verificationCode === correctCode){
      alert('Girdiğiniz kod doğru');
      this.router.navigate(["reset-password"])
    }
    else{
      alert('Girdiginiz kod yanlis,lütfen tekrar deneyiniz');
      this.errorMessage='Girdiginiz kod yanlis,lütfen tekrar deneyiniz';
    }

  }
}
