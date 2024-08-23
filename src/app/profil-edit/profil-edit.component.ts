import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
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
      private authService:AuthService,
      private toastr: ToastrService, 
      private translate: TranslateService,

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
   
    onUpdate(): void {
      if (this.profileEditForm.valid) {
        const { fullName, email, Gender } = this.profileEditForm.value;
        const profileeditmodel: ProfileEditModel = { fullName, email, Gender };
        console.log(profileeditmodel);
    
        this.profileEditService.profileEdit(profileeditmodel, this.userId).subscribe({
          next: (response: any) => {
            this.translate.get('PROFILE_UPDATE_SUCCESS').subscribe((res: string) => {
              this.toastr.success(res, 'Success');
            });
            this.router.navigate([``]);
          },
          error: (error: any) => {
            if (error.status === 400) {
              if (error.error === 'EMAIL_ALREADY_EXISTS') {
                this.translate.get('EMAIL_ALREADY_EXISTS').subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
              } else if (error.error === 'USERNAME_ALREADY_EXISTS') {
                this.translate.get('USERNAME_ALREADY_EXISTS').subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
              } else {
                this.translate.get('UPDATE_FAILED_TRY_AGAIN').subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
              }
            } else {
              this.translate.get('UPDATE_FAILED').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
            }
            console.error('Update failed', error);
          }
        });
      }
    }
    
    
    
    navigateToProfile(){
      if(this.userId){
        this.router.navigate(["/profile",this.userId]);
      }
    }  
}
