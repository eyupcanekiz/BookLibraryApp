import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationCodeService } from './verification-code.service'; // Servisi import edin

@Component({
  selector: 'app-verification-enter',
  templateUrl: './verification-enter.component.html',
  styleUrls: ['./verification-enter.component.scss']
})
export class VerificationEnterComponent {
  verificationCode: string = '';  // Kullanıcının girdiği kod
  errorMessage: string = '';      // Hataları göstermek için

  constructor(
    private router: Router,
    private verificationCodeService: VerificationCodeService // Servisi inject edin
  ) {}

  onSubmit() {
    const correctCode = this.verificationCodeService.getVerificationCode(); // Doğru kodu servisten alın

    if (this.verificationCode === correctCode) {
      // Kod doğru ise
      console.log('Girdiğiniz kod doğru!');
      alert('Girdiğiniz kod doğru!');
      this.router.navigate(['/login']); // Kullanıcıyı login sayfasına yönlendir
      return true;
    } else {
      // Kod yanlış ise
      this.errorMessage = 'Girdiğiniz kod yanlış, lütfen tekrar deneyin.';
      return false;
    }
  }
}
