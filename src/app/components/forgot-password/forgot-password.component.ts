import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailVerificationService } from '../register/emailVerification.service';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { HttpClient } from '@angular/common/http';
import { ForgetPasswordService } from './forgot-password.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  verificationCode: string = '';
  private emailSent: boolean = false;
  email:string =""
  fetchEmail:string=""
  private userName:string =""

  constructor(
    private fb: FormBuilder,
    private emailVerificationService: EmailVerificationService,
    private verificationCodeService: VerificationCodeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private emailservice: EmailVerificationService,
    private http: HttpClient,
    private forgotPasswordService:ForgetPasswordService
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
  loadHtmlContent() {
    const {email} = this.forgotPasswordForm.value;
    this.email=email;
    this.http.get('assets/email-verification.component.html', { responseType: 'text' })
      .subscribe((htmlContent: string) => {
        const modifiedHtmlContent = htmlContent
          .replace('{{verificationCode}}', this.verificationCode)
          .replace('{{verificationName}}', this.email);
        this.sendEmailVerification(modifiedHtmlContent);
      });
    }
  
  sendEmailVerification(htmlContent: string) {
    const {email} = this.forgotPasswordForm.value;
    const emailData = {
      EmailAddress: email,
      HtmlContent: htmlContent
    };
  
    this.emailservice.sendVerificationCode(emailData)
    .subscribe({
      next: (response) => {
        console.log('Verification email sent successfully', response);
        this.emailSent = true;
      },
      error: (error) => {
        console.error('Error sending verification email', error);
        this.snackBar.open('E-posta doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
      }
    });
  }
  fetchUserByEmail(email:string):Promise<void>{
    return new Promise((resolve,reject) =>{
      this.forgotPasswordService.getEmail(email).subscribe({
        next:(response)=>{
          this.fetchEmail=response.email;
          this.userName=response.userName
          
          resolve();
        },
        error:(error)=>{
          this.snackBar.open('Bu epostaya ait kayitli kullanici yok', 'Close', { duration: 3000 });
          console.log("Kullanici getirlemedi",error);
          reject();
        }
      }) 
    })
    
  }


  async sendPasswordResetEmail() {
    if (this.forgotPasswordForm.valid) {

    
      const{email} = this.forgotPasswordForm.value;
      await this.fetchUserByEmail(email);
      console.log(this.fetchEmail);
      
      if(this.fetchEmail){
          this.generateVerificationCode();
          this.loadHtmlContent();
         this.router.navigate(['/verify-password',this.userName]);
       }
    }
  }
}
