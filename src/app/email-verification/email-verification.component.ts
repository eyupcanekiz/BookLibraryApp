import { Component } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  email: string = '';
  verificationCode: string = '';
  generatedCode: string = '';
  isCodeSent: boolean = false;
  isVerified: boolean = false;

  sendVerificationCode() {
    // Burada backend'e bir istek gönderebilir ve doğrulama kodunu gönderebilirsiniz.
    // Şimdilik basit bir rastgele kod üreteceğiz.
    this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated code:', this.generatedCode); // Sadece test amaçlı, konsolda gösteriyoruz.
    this.isCodeSent = true;
  }

  verifyCode() {
    if (this.verificationCode === this.generatedCode) {
      this.isVerified = true;
    } else {
      alert('Verification code is incorrect. Please try again.');
    }
  }
}
