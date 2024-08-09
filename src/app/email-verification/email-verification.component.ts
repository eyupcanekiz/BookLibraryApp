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
    // Kullanıcının girdiği e-posta adresini alıp backend'e gönderiyoruz
    this.emailVerificationService.sendVerificationCode(this.email).subscribe(response => {
      this.isCodeSent = true;
      console.log('Verification code sent:', response);
    }, error => {
      console.error('Error sending verification code:', error);
    });
  }

  verifyCode() {
    // Bu kısımda doğrulama kodunu backend ile kontrol edebilirsiniz
    if (this.verificationCode === '123456') { // Örnek kod; backend'den dönen kodu burada kullanmalısınız
      this.isVerified = true;
    } else {
      alert('Verification code is incorrect. Please try again.');
    }
  }
}
