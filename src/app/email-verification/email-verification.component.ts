import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailVerificationService } from './email-verification.service';
import { VerificationCodeService } from '../verification-enter/verification-code.service'; // Servisi import edin
import { Router } from '@angular/router';
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  verificationCode: string = '';
  verificationName: string = 'Alperen';
  private emailSent: boolean = false;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private emailservice: EmailVerificationService,
    private verificationCodeService: VerificationCodeService, // Servisi inject edin
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    
    if (!this.emailSent) {
      this.generateVerificationCode();
      this.loadHtmlContent();
    }
  }

  generateVerificationCode() {
    this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCodeService.setVerificationCode(this.verificationCode); // Doğrulama kodunu servise kaydedin
  }

  loadHtmlContent() {
    this.http.get('assets/email-verification.component.html', { responseType: 'text' })
      .subscribe((htmlContent: string) => {
        const modifiedHtmlContent = htmlContent
          .replace('{{verificationCode}}', this.verificationCode)
          .replace('{{verificationName}}', this.verificationName);
        this.sendEmailVerification(modifiedHtmlContent);
      });
  }

  sendEmailVerification(htmlContent: string) {
    const emailData = {
      EmailAddress: 'eyupcanekiz0@gmail.com',
      HtmlContent: htmlContent
    };

    this.emailservice.sendVerificationCode(emailData)
      .subscribe(response => {
        console.log('Verification email sent successfully');
        this.emailSent = true; 
        this.router.navigate(['/verification-enter']);
      }, error => {
        console.error('Error sending verification email', error);
      });
  }
}

