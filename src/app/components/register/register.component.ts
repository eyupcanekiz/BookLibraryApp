import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { RegisterModel, GenderType } from './registerModel';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { EmailVerificationService } from './emailVerification.service';
import { VerificationEnterComponent } from '../../verification-enter/verification-enter.component';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private emailservice: EmailVerificationService,
    private verificationCodeService: VerificationCodeService,
    private verificationCodeComponent: VerificationEnterComponent,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', [Validators.required]],
      FullName: [''],
      Email: ['', [Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      PasswordRepeat: ['', [Validators.required]],
      Gender: this.genderType.other,
    });

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  generateVerificationCode() {
    this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCodeService.setVerificationCode(this.verificationCode); // Doğrulama kodunu servise kaydedin
  }

  loadHtmlContent() {
    const { FullName } = this.registerForm.value;
    this.verificationName = FullName;
    this.http.get('assets/email-verification.component.html', { responseType: 'text' })
      .subscribe((htmlContent: string) => {
        const modifiedHtmlContent = htmlContent
          .replace('{{verificationCode}}', this.verificationCode)
          .replace('{{verificationName}}', this.verificationName);
        this.sendEmailVerification(modifiedHtmlContent);
      });
  }

  sendEmailVerification(htmlContent: string) {
    const { Email } = this.registerForm.value;
    const emailData = {
      EmailAddress: Email,
      HtmlContent: htmlContent
    };

    this.emailservice.sendVerificationCode(emailData)
      .subscribe({
        next: (response) => {
          this.translate.get('VERIFICATION_EMAIL_SENT').subscribe((res: string) => {
            this.toastr.success(res, 'Success');
          });
          this.emailSent = true;
        },
        error: (error) => {
          this.translate.get('VERIFICATION_EMAIL_ERROR').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
        }
      });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.generateVerificationCode();
      this.loadHtmlContent();

      const { UserName, FullName, Email, Password, PasswordRepeat, Gender } = this.registerForm.value;

      if (Password !== PasswordRepeat) {
        this.translate.get('PASSWORDS_DO_NOT_MATCH').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
        return;
      }

      const registerModel: RegisterModel = { UserName, FullName, Email, Password, PasswordRepeat, Gender };
      const key = 'YourSecretKeyForEncryption&Descryption';
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(registerModel), key).toString();
      this.router.navigate(['/verification-enter', { data: encryptedData }]);
    }
  }
}
