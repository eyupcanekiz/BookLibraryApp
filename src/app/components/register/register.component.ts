import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { RegisterModel, GenderType } from './registerModel';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { EmailVerificationService } from './emailVerification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private emailservice: EmailVerificationService,
    private verificationCodeService: VerificationCodeService
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
        this.router.navigate(["/verification-enter"]);
      },
      error: (error) => {
        console.error('Error sending verification email', error);
        this.snackBar.open('E-posta doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
      }
    });
  }
  
  onRegister(): void {
    if (this.registerForm.valid) {
      const { UserName, FullName, Email, Password, PasswordRepeat, Gender } = this.registerForm.value;
    
      if (Password !== PasswordRepeat) {
        this.snackBar.open('Şifreler eşleşmiyor', 'Close', { duration: 3000 });
        return;
      }
      const registerModel: RegisterModel = { UserName, FullName, Email, Password, PasswordRepeat, Gender };
      this.registerService.register(registerModel).subscribe({
        next: (response: any) => {
          this.generateVerificationCode();
          this.loadHtmlContent();
          this.snackBar.open('Başarıyla kayıt olundu', 'Close', { duration: 3000 });
       
        },
        error: (error: any) => {
    
          if (error.status === 400) { // Hata kodu backend'de 400 olarak tanımlanabilir
            if (error.error === 'EMAIL_ALREADY_EXISTS') {
              this.snackBar.open('Bu e-posta adresi zaten kayıtlı', 'Close', { duration: 3000 });
            } else if (error.error === 'USERNAME_ALREADY_EXISTS') {
              this.snackBar.open('Bu kullanıcı adı zaten kayıtlı', 'Close', { duration: 3000 });
            } else {
              this.snackBar.open('Kayıt başarısız. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
            }
          } else {
            this.snackBar.open('Kayıt başarısız', 'Close', { duration: 3000 });
          }
          console.error('Kayıt başarısız', error);
        }
      });
    }
  }

 

}
