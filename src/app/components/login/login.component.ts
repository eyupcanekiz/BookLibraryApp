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
  isEmailFormVisible: boolean = true;  // Başlangıçta e-posta formunu gösterir
  isUsernameFormVisible: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.setDateNowWithOffset(15);
  }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email: [''],
      username: [''],
      password: ['', Validators.required]
    });
  }
  private setDateNowWithOffset(minutes: number) {
    let now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    this.dateNow = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss')!;
  }

  showEmailForm() {
    this.isEmailFormVisible = true;
    this.isUsernameFormVisible = false;
  }

  showUsernameForm() {
    this.isEmailFormVisible = false;
    this.isUsernameFormVisible = true;
  }
  onLogin() {
    if (this.loginForm.valid) {
      const {email, username, password } = this.loginForm.value;
      this.authService.login(email,username, password).subscribe({
        next: (response) => {
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });

          if (response.authenticateResult) {
            this.authService.getToken().subscribe({
              next: (token) => {
                localStorage.setItem("AuthToken", token);
                localStorage.setItem('DateNow', this.dateNow);
                this.authService.getCurrentUser().subscribe(user => {
                  if (user && user.isAdmin) {
                    this.router.navigate(['/admin']);
                  }if(user) {
                    this.router.navigate(['all-books']);
                  }
                });
              },
              error: (error) => {
                console.log("Token alınamadı: ", error);
              }
            });
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
}
