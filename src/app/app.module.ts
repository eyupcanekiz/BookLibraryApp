import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
=======
import { BrowserModule } from '@angular/platform-browser';
>>>>>>> a57f179f18fad41d7785acd6a32ee39ea3da5981
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
=======
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> a57f179f18fad41d7785acd6a32ee39ea3da5981

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    ContactComponent,
    LoginComponent,
<<<<<<< HEAD
    HomeComponent,
    CarouselComponent
=======
    RegisterComponent
>>>>>>> a57f179f18fad41d7785acd6a32ee39ea3da5981
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    MatButtonModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
=======
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,  
    BrowserAnimationsModule
>>>>>>> a57f179f18fad41d7785acd6a32ee39ea3da5981
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
