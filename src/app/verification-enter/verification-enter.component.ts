import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationCodeService } from './verification-code.service'; // Servisi import edin
import { RegisterService } from '../components/register/register.service';
import { RegisterModel } from '../components/register/registerModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
    private route:ActivatedRoute,
    private toastr: ToastrService, 
    private translate: TranslateService
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
    this.translate.get('VERIFICATION_CODE_CORRECT').subscribe((res: string) => {
      this.toastr.success(res, 'Success');
    });

    this.registerService.register(this.model).subscribe({
      next: (response: any) => {
        this.router.navigate(["/"]);
        this.translate.get('REGISTRATION_SUCCESSFUL').subscribe((res: string) => {
          this.toastr.success(res, 'Success');
        });
      },
      error: (error: any) => {
        if (error.status === 400) {
          if (error.error === 'EMAIL_ALREADY_EXISTS') {
            this.translate.get('EMAIL_ALREADY_EXISTS').subscribe((res: string) => {
              this.toastr.error(res, 'Error', { timeOut: 3000 });
            });
          } else if (error.error === 'USERNAME_ALREADY_EXISTS') {
            this.translate.get('USERNAME_ALREADY_EXISTS').subscribe((res: string) => {
              this.toastr.error(res, 'Error', { timeOut: 3000 });
            });
          } else {
            this.translate.get('REGISTRATION_FAILED').subscribe((res: string) => {
              this.toastr.error(res, 'Error', { timeOut: 3000 });
            });
          }
        } else {
          this.translate.get('REGISTRATION_FAILED').subscribe((res: string) => {
            this.toastr.error(res, 'Error', { timeOut: 3000 });
          });
        }
        console.error('Kayıt başarısız', error);
      }
    });
  } else {
    // Kod yanlış ise
    this.translate.get('VERIFICATION_CODE_INCORRECT').subscribe((res: string) => {
      this.toastr.error(res, 'Error', { timeOut: 3000 });
    });
    this.errorMessage = this.translate.instant('VERIFICATION_CODE_INCORRECT');
  }
}
}