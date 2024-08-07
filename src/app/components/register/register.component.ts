import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from './register.service'; // Dosya adı düzeltildi
import { RegisterModel } from './registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', [Validators.required]],
      FullName: [''],
      Email: ['' ],
      Password: ['',[Validators.required,Validators.minLength(8)]],
      PasswordRepeat: ['',[Validators.required] ]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { UserName, FullName, Email, Password, PasswordRepeat } = this.registerForm.value;
      if (Password !== PasswordRepeat) {
        this.snackBar.open('Şifreler eşleşmiyor', 'Close', { duration: 3000 });
        return;
      }

      if(Password.minLength < 8 || PasswordRepeat.minLength < 8){
        this.snackBar.open('Şifre en az 8 karakter olmalıdır', 'Close', {duration:3000});
        return;
      }
      const registerModel: RegisterModel = { UserName, FullName, Email, Password, PasswordRepeat };
      this.registerService.register(registerModel ).subscribe({
        next: (response: any) => {
          this.snackBar.open('Başarıyla kayıt olundu', 'Close', { duration: 3000 });
  
        },
        error: (error: any) => {
          this.snackBar.open('Kayıt başarısız', 'Close', { duration: 3000 });
          console.error('Kayıt başarısız', error);
        }
      });
    }
  }
}
