import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './components/login/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'header',
    component: HeaderComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  
  {
    path:'login',
    component: LoginComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
