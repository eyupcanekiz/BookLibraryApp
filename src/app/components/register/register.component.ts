import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { RegisterModel, GenderType } from './registerModel';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { EmailVerificationService } from './emailVerification.service';
import { VerificationEnterComponent } from '../../verification-enter/verification-enter.component';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], 
  providers: [VerificationEnterComponent],

})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  genderType = GenderType; 
  verificationCode: string = '';
  verificationName: string = 'Alperen';
  private emailSent: boolean = false;
  check!:boolean;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private emailservice: EmailVerificationService,
    private verificationCodeService: VerificationCodeService,
    private verificationCodeCompenent : VerificationEnterComponent

  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', [Validators.required]],
      FullName: [''],
      Email: ['',[Validators.email]],
      Password: ['',[Validators.required,Validators.minLength(8)]],
      PasswordRepeat: ['',[Validators.required] ],
      Gender: this.genderType.other
    
    });
  }
  
  generateVerificationCode() {
    this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCodeService.setVerificationCode(this.verificationCode); // Doğrulama kodunu servise kaydedin
  }

  loadHtmlContent() {
    const {FullName} = this.registerForm.value;
    this.verificationName=FullName;
    this.http.get('assets/email-verification.component.html', { responseType: 'text' })
      .subscribe((htmlContent: string) => {
        const modifiedHtmlContent = htmlContent
          .replace('{{verificationCode}}', this.verificationCode)
          .replace('{{verificationName}}', this.verificationName);
        this.sendEmailVerification(modifiedHtmlContent);
      });
  }

  sendEmailVerification(htmlContent: string) {
    const {Email} = this.registerForm.value;
    const emailData = {
      EmailAddress: Email,
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

  
  onRegister(): void {
    if (this.registerForm.valid) {
      this.generateVerificationCode();
      this.loadHtmlContent();

      const { UserName, FullName, Email, Password, PasswordRepeat, Gender } = this.registerForm.value;
      
      if (Password !== PasswordRepeat) {
        this.snackBar.open('Şifreler eşleşmiyor', 'Close', { duration: 3000 });
        return;
      }
    
      const registerModel: RegisterModel = { UserName, FullName, Email, Password, PasswordRepeat, Gender };
      const key = 'YourSecretKeyForEncryption&Descryption';
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerModel), key).toString();
      this.router.navigate(['/verification-enter', { data: encryptedData }]);

    }
  }
}
 


