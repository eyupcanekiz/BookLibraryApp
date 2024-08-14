import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { passwordRequest } from './password-Request';

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
    private resetPasswordService:ResetPasswordService

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
        this.snackBar.open('Şifreler eşleşmiyor.', 'Close', { duration: 3000 });
        return;
      }
      const passwordRequestModel:passwordRequest={password};
      this.resetPasswordService.updatePassword(passwordRequestModel,this.userName).subscribe({
        next:(response:any) =>{
          this.snackBar.open("Basariyla sifre guncellendi","Close",{duration:3000});
          this.router.navigate(["login"])

        },
        error:(error)=>{
          this.snackBar.open("Sifre güncellenemedi"),
          this.router.navigate(["reset-password",this.userName])
          console.log(error)
        }
      })
      

     
    }
  }
}
