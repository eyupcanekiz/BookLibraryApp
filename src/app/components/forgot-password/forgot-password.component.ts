import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailVerificationService } from '../register/emailVerification.service';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  verificationCode: string = '';

  constructor(
    private fb: FormBuilder,
    private emailVerificationService: EmailVerificationService,
    private verificationCodeService: VerificationCodeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  generateVerificationCode() {
    this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCodeService.setVerificationCode(this.verificationCode); // Doğrulama kodunu servise kaydedin
  }

  sendPasswordResetEmail() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;

      this.generateVerificationCode();

      this.emailVerificationService.sendVerificationCode({
        EmailAddress: email,
        HtmlContent: `Your verification code is: ${this.verificationCode}`
      }).subscribe({
        next: () => {
          this.snackBar.open('Doğrulama kodu e-posta adresinize gönderildi.', 'Close', { duration: 3000 });
          this.router.navigate(['/reset-password']);
        },
        error: (error) => {
          this.snackBar.open('Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
          console.error('Error sending verification email', error);
        }
      });
    }
  }
}
