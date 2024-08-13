import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AuthGuard } from './components/login/auth.guard';
import { BookComponent } from './components/book/book.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BorrowbookComponent } from './components/borrowbook/borrowbook.component';
import { VerificationEnterComponent } from './verification-enter/verification-enter.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AppComponent } from './app.component';
import { ReadoutBookComponent } from './components/readoutbook/readoutbook.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { AllBookShowComponent } from './all-book-show/all-book-show.component';
import { AllBooksComponent } from './all-books/all-books.component';



const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent,canActivate:[AuthGuard] },
      { path: 'login', component: LoginComponent , canActivate:[AuthGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'return-book', component: ReturnBookComponent },
      { path: 'my-books', component: MyBooksComponent },  
      { path: 'return-book', component: ReturnBookComponent },
      { path: 'book', component: BookComponent},
      { path: 'profil-edit/:id', component: ProfilEditComponent},
      { path: 'borrowbook', component: BorrowbookComponent},
      { path: 'verification-enter', component: VerificationEnterComponent},
      { path: 'readoutbook', component: ReadoutBookComponent},
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'forgot-password', component:ForgotPasswordComponent},
      { path: 'verify-password', component:VerifyPasswordComponent},
      { path: 'all-books', component: AllBooksComponent },
      { path: 'all-book-show/:name', component: AllBookShowComponent },



    ]
  },
  {

    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path: 'not-authorized', component: NotAuthorizedComponent },
    ]
  }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
