import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
// import { HeaderComponent } from './components/header/header.component';
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
import { AppComponent } from './app.component';
import { AuthGuard } from './components/login/auth.guard';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './components/book/book.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';

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
      { path: 'add-book', component: AddBookComponent },
      { path: 'book', component: BookComponent},
      { path: 'profil-edit', component: ProfilEditComponent}
    ]
  },
  {

    path: '',
    component: MainLayoutComponent,
    children: [
     
    ]
  }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
