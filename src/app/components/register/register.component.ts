import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { RegisterModel, GenderType } from './registerModel';
import { time } from 'console';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  genderType = GenderType; 

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
      Email: ['',[Validators.email]],
      Password: ['',[Validators.required,Validators.minLength(8)]],
      PasswordRepeat: ['',[Validators.required] ],
      Gender: this.genderType.other
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { UserName, FullName, Email, Password, PasswordRepeat, Gender } = this.registerForm.value;
    
      if (Password !== PasswordRepeat) {
        this.snackBar.open('Şifreler eşleşmiyor', 'Close', { duration: 3000 });
        return;
      }
      const registerModel: RegisterModel = { UserName, FullName, Email, Password, PasswordRepeat,Gender };
      this.registerService.register(registerModel ).subscribe({
        next: (response: any) => {
          this.snackBar.open('Başarıyla kayıt olundu', 'Close', { duration: 3000 });
          this.router.navigate(['/email-verification']);
        },
        error: (error: any) => {
          // Backend'den dönen hata mesajını yakalama
          if (error.status === 400) { // Hata kodu backend'de 400 olarak tanımlanabilir
            if (error.error === 'EMAIL_ALREADY_EXISTS') {
              this.snackBar.open('Bu e-posta adresi zaten kayıtlı', 'Close', { duration: 3000 });
            } else if (error.error === 'USERNAME_ALREADY_EXISTS') {
              this.snackBar.open('Bu kullanıcı adı zaten kayıtlı', 'Close', { duration: 3000 });
            } else {
              this.snackBar.open('Kayıt başarısız. Lütfen tekrar deneyin.', 'Close', { duration: 3000 });
            }
          } else {
            this.snackBar.open('Kayıt başarısız', 'Close', { duration: 3000 });
          }
          console.error('Kayıt başarısız', error);
        }
      });
    }
  }
 
  
  
}
