import { Component } from '@angular/core';
import { EmailVerificationService } from './email-verification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  email: string = '';
  verificationCode: string = '';
  isCodeSent: boolean = false;
  isVerified: boolean = false;

  constructor(private emailVerificationService: EmailVerificationService) {}

  sendVerificationCode() {
    this.emailVerificationService.sendVerificationCode(this.email).subscribe(response => {
      this.isCodeSent = true;
      console.log('Verification code sent:', response);
    }, error => {
      console.error('Error sending verification code:', error);
    });
  }

  verifyCode() {
    // Kod doğrulama işlemi burada yapılacak
    // Bu örnekte backend'den alınan bir doğrulama kodu bulunmamakta. Bunu backend'e göre uyarlayabilirsiniz.
    if (this.verificationCode === '123456') { // Bu örnek kod; gerçek kodu backend'den almalısınız
      this.isVerified = true;
    } else {
      alert('Verification code is incorrect. Please try again.');
    }
  }
}
