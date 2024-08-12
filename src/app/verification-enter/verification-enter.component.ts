import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-enter',
  templateUrl: './verification-enter.component.html',
  styleUrls: ['./verification-enter.component.scss']
})
export class VerificationEnterComponent {
  verificationCode: string = '';  // Kullanıcının girdiği kod
  correctCode: string = '123456'; // Bu, backend'den gelen doğru kod olmalıdır
  errorMessage: string = '';      // Hataları göstermek için

  constructor(private router: Router) {}

  onSubmit() {
    if (this.verificationCode === this.correctCode) {
      // Kod doğru ise
      console.log('Girdiğiniz kod doğru!');
      alert('Girdiğiniz kod doğru!');
      this.router.navigate(['/login']); // Kullanıcıyı login sayfasına yönlendir
    } else {
      // Kod yanlış ise
      this.errorMessage = 'Girdiğiniz kod yanlış, lütfen tekrar deneyin.';
    }
  }
}
