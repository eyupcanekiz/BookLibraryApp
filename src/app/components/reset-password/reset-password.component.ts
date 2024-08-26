import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { passwordRequest } from './password-Request';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  userName:string="";
  passwordUpdate:string="";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route:ActivatedRoute,
    private resetPasswordService:ResetPasswordService,
    private toastr: ToastrService, 
    private translate: TranslateService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userName = params.get('name')!;

    })
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    
    });

  
    
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;

      if (password !== confirmPassword) {
        this.translate.get('PASSWORDS_DO_NOT_MATCH').subscribe((res: string) => {
          this.toastr.error(res, 'Error', { timeOut: 3000 });
        });
        return;
      }

      const passwordRequestModel: passwordRequest = { password };

      this.resetPasswordService.updatePassword(passwordRequestModel, this.userName).subscribe({
        next: (response: any) => {
          this.translate.get('PASSWORD_UPDATED_SUCCESSFULLY').subscribe((res: string) => {
            this.toastr.success(res, 'Success', { timeOut: 3000 });
          });
          this.router.navigate(["login"]);
        },
        error: (error) => {
          this.translate.get('PASSWORD_UPDATE_FAILED').subscribe((res: string) => {
            this.toastr.error(res, 'Error', { timeOut: 3000 });
          });
          this.router.navigate(["reset-password", this.userName]);
          console.log(error);
        }
      });
    }
  }
}
