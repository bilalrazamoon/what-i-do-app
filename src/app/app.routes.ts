import { Router, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, UnAuthGuard } from './app.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
