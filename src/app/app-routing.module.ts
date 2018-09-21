import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AfterLoginService } from './services/afterLogin';
import { BeforeLoginService } from './services/beforeLogin';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { IsCompanyAdminService } from './services/is-company-admin.service'
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'reset-password',
    component : RequestResetComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'reset-password-submit',
    component : ResponseResetComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'users',
    component: ProfileComponent,
    canActivate : [AfterLoginService]
  },
  {
    path: '',
    component: HomeComponent
    },
    {
      path: 'dashboard',
      component: ProfileComponent,
      canActivate : [IsCompanyAdminService]
    },
  {
    path: 'notice',
    component: DashboardComponent,
    canActivate : [AfterLoginService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
