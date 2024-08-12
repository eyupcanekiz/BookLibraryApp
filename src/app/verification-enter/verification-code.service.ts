import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationCodeService {
  private verificationCode: string = '';

  setVerificationCode(code: string) {
    this.verificationCode = code;
  }

  getVerificationCode(): string {
    return this.verificationCode;
  }
  
}
