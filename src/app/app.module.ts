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
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnotherNavbarComponent } from './another-navbar/another-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ReturnBookComponent } from './return-book/return-book.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookModule } from './components/book/book.module'; //BookModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // HeaderComponent,
    ContactComponent,
    LoginComponent,
    CarouselComponent,
    RegisterComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    NavbarComponent,
    AnotherNavbarComponent,
    DashboardComponent,
    ProfileComponent,
    ReturnBookComponent,
    MyBooksComponent,
    AddBookComponent
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BookModule, // bookmodule
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
