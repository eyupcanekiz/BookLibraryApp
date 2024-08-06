import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          if(response.authenticateResult){// console.log('Login successful, Token:', token);
            this.router.navigate(['/']); // Giriş yaptıktan sonra dashboard sayfasına yönlendir
            console.log("Giriş işlemi başarılı",response.authToken)
  
           
            this.authService.getToken().subscribe({
              next:(token) =>{
                console.log("token:",token)
                localStorage.setItem("AuthToken",token)
              },
              error:(error) =>{
                console.log("token listelenemedi: " ,error)
              }
            }) }
          if(!response.authenticateResult){   this.snackBar.open('Login failed', 'Close', { duration: 3000 });}

<<<<<<< HEAD
          
          
=======
          // console.log('Login successful, Token:', token);
          this.router.navigate(['/dashboard']); // Giriş yaptıktan sonra dashboard sayfasına yönlendir
          console.log("Giriş işlemi başarılı",response)

         
          this.authService.getToken().subscribe({
            next:(token) =>{
              console.log("token:",token)
              localStorage.setItem("AuthToken",token)
            },
            error:(error) =>{
              console.log("token listelenemedi: " ,error)
            }
          })
>>>>>>> fb545dc1c42aec3137a6bc05c4ea23adcc4ff856
          
        },
        error: (error) => {
          this.snackBar.open('Login failed', 'Close', { duration: 3000 });
          console.error('Login failed', error);
        }

      });
   

    }
  }}
  
