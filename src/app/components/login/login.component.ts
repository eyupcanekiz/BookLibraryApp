import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  dateNow!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.setDateNowWithOffset(5);
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  private setDateNowWithOffset(minutes: number) {
    let now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    this.dateNow = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss')!;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response.authenticateResult) {
            this.handleSuccessfulLogin();
          } else {
            this.snackBar.open('Login failed', 'Close', { duration: 3000 });
          }
        },
        error: (error) => {
          this.snackBar.open('Login failed', 'Close', { duration: 3000 });
          console.error('Login failed', error);
        }
      });
    }
  }

  private handleSuccessfulLogin() {
    this.snackBar.open('Login successful', 'Close', { duration: 3000 });
    this.router.navigate(['/my-books']);
    this.authService.getToken().subscribe({
      next: (token) => {
        this.saveTokenAndDate(token);
      },
      error: (error) => {
        console.error('Token could not be retrieved:', error);
      }
    });
  }

  private saveTokenAndDate(token: string) {
    localStorage.setItem('AuthToken', token);
    localStorage.setItem('DateNow', this.dateNow);
  }
}
