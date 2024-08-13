import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    
  ) { }

  ngOnInit(): void {
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

     
    }
  }
}
