import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
// import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnotherNavbarComponent } from './another-navbar/another-navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { MyBooksComponent } from './my-books/my-books.component';
import { BookModule } from './components/book/book.module'; //BookModule
import { BookService } from './components/book/book.service';//bookservice
import { ProfilEditComponent } from './profil-edit/profil-edit.component'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { BorrowbookService } from './components/borrowbook/borrowbook.service';
import { BorrowbookModule } from './components/borrowbook/borrowbook.module';
import { VerificationEnterComponent } from './verification-enter/verification-enter.component';
import { AdminComponent } from './admin/admin.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { AllBookShowComponent } from './all-book-show/all-book-show.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    CarouselComponent,
    RegisterComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    NavbarComponent,
    AnotherNavbarComponent,
    ProfileComponent,
    MyBooksComponent,
    ProfilEditComponent,
    VerificationEnterComponent,
    AdminComponent,
    NotAuthorizedComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyPasswordComponent,
    AllBooksComponent,
    AllBookShowComponent,

  ],
  providers: [
    provideHttpClient(withFetch()),
    [BookService, BorrowbookService], //  BookService  providers
  ],
  imports: [
    BrowserModule,
    FormsModule,//form module
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    BookModule, 
    BorrowbookModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
