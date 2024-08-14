import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationCodeService } from './verification-code.service'; // Servisi import edin
import { RegisterService } from '../components/register/register.service';
import { RegisterModel } from '../components/register/registerModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-verification-enter',
  templateUrl: './verification-enter.component.html',
  styleUrls: ['./verification-enter.component.scss']
})
export class VerificationEnterComponent implements OnInit {
  verificationCode: string = '';  // Kullanıcının girdiği kod
  errorMessage: string = '';      
  model:any
  constructor(
    private router: Router,
    private verificationCodeService: VerificationCodeService, // Servisi inject edin
    private registerService :RegisterService,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute
) {}
ngOnInit(): void {
  const key = 'YourSecretKeyForEncryption&Descryption';
  const encryptedData = this.route.snapshot.paramMap.get('data');
  
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
    if (decryptedData) {
      this.model = JSON.parse(decryptedData);
    } else {
      console.error('Decryption failed, decrypted data is null or empty');
    }
  } else {
    console.error('No encrypted data found in route parameters');
  }
}
  

  onSubmit() {
    const correctCode = this.verificationCodeService.getVerificationCode(); // Doğru kodu servisten alın
    console.log(this.model);
    
    if (this.verificationCode === correctCode) {
      // Kod doğru ise
      console.log('Girdiğiniz kod doğru!');
      alert('Girdiğiniz kod doğru!');
      this.registerService.register(this.model).subscribe({
        next: (response: any) => {
          this.router.navigate(["/"])
          this.snackBar.open('Başarıyla kayıt olundu', 'Close');
          
       
        },
        error: (error: any) => {
    
          if (error.status === 400) { 
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
      
      
    
     else {
      // Kod yanlış ise
      this.errorMessage = 'Girdiğiniz kod yanlış, lütfen tekrar deneyin.';
      
    }
  }
}