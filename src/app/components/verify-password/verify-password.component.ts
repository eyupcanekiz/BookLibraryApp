import { Component, OnInit } from '@angular/core';
import { VerificationCodeService } from '../../verification-enter/verification-code.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrl: './verify-password.component.scss'
})
export class VerifyPasswordComponent implements OnInit{
  errorMessage:string ="";
  verificationCode: string ="";
  userName:string="";


  constructor(
    private verificationCodeService :VerificationCodeService,
    private router :Router,
    private route :ActivatedRoute,
    private toastr: ToastrService, 
    private translate: TranslateService

  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userName = params.get('name')!;

    })
  }
  onSubmit() {
    const correctCode = this.verificationCodeService.getVerificationCode();
    
    if (this.verificationCode === correctCode) {
      this.translate.get('VERIFICATION_CODE_CORRECT').subscribe((res: string) => {
        this.toastr.success(res, 'Success');  // Başarı mesajı göster
      });
      this.router.navigate(["reset-password", this.userName]);
    } else {
      this.translate.get('VERIFICATION_CODE_INCORRECT').subscribe((res: string) => {
        this.toastr.error(res, 'Error');  // Hata mesajı göster
      });
      this.errorMessage = this.translate.instant('VERIFICATION_CODE_INCORRECT');  // Anında çeviri ve hata mesajı ayarı
    }
  }
}
