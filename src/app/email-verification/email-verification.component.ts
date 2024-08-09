import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailVerificationService } from './email-verification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  verificationCode: string = '';

  constructor(
    private http: HttpClient, 
    private sanitizer: DomSanitizer,
    private emailservice: EmailVerificationService
  ) { }

  ngOnInit(): void {
    this.generateVerificationCode();
    this.loadHtmlContent();
  }

  // Generate a 6-digit verification code
  generateVerificationCode() {
    this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  }

  loadHtmlContent() {
    this.http.get('assets/email-verification.component.html', { responseType: 'text' })
      .subscribe((htmlContent: string) => {
        // Replace the placeholder with the actual verification code
        const modifiedHtmlContent = htmlContent.replace('{{verificationCode}}', this.verificationCode);
        this.sendEmailVerification(modifiedHtmlContent);
      });
  }

  sendEmailVerification(htmlContent: string) {
    const emailData = {
      EmailAddress: 'alperenakkal06@gmail.com',  
      HtmlContent: htmlContent  
    };

    this.emailservice.sendVerificationCode(emailData)
      .subscribe(response => {
        console.log('Verification email sent successfully');
      }, error => {
        console.error('Error sending verification email', error);
      });
  }
}
