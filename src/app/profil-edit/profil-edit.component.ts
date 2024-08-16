import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderType, ProfileEditModel } from './profile-edit.model';
import { response } from 'express';
import { ProfileEditService } from './profile-edit.service';
import { AuthService } from '../components/login/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrl: './profil-edit.component.scss'
})
export class ProfilEditComponent implements OnInit {
    profileEditForm!:FormGroup;
    genderType = GenderType; 
    userId:string='';
    constructor(
      private fb:FormBuilder,
      private profileEditService: ProfileEditService,
      private snackBar:MatSnackBar,
      private router :Router,
      private route:ActivatedRoute,
      private authService:AuthService

    ){}

    ngOnInit(): void {
     
      this.profileEditForm= this.fb.group({
        fullName:[""],
        email:["",[Validators.email]],
        Gender:['other']
      })
      this.route.paramMap.subscribe(params =>{
        this.userId= params.get('id')!;
      })
      this.getUser();
   

    }
    getUser(){
      let genderSelect=0;
      if(this.profileEditForm.get("Gender")?.value=="male"){
        genderSelect=1
      }
      if(this.profileEditForm.get("Gender")?.value=="female"){
        genderSelect=2
      }
      this.authService.getById(this.userId).subscribe({
        next:(response)=>{
          const profileUpdateModel : ProfileEditModel={
         
            email:response.email,
            fullName:response.fullName,
            Gender:genderSelect,

          }
          this.profileEditForm.patchValue({
          
            email: profileUpdateModel.email,
            fullName: profileUpdateModel.fullName,
            Gender: profileUpdateModel.Gender
          });
        },
        error:(error) =>{
            console.log("Kullanici getirelemedi", error) ;
            
        }
      })
    }
   
    onUpdate():void{
      if(this.profileEditForm.valid){
        const{ fullName,email,Gender}=this.profileEditForm.value;
        const profileeditmodel:ProfileEditModel={fullName,email,Gender};
        console.log(profileeditmodel);
        
        this.profileEditService.profileEdit(profileeditmodel,this.userId).subscribe({
          next:(response:any)=>{
            this.snackBar.open('Basariyla profil güncellendi','Close',{duration:3000});
            this.router.navigate([``])
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
        })
      }
    }
    
    
    navigateToProfile(){
      if(this.userId){
        this.router.navigate(["/profile",this.userId]);
      }
    }  
}
