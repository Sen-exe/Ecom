import { CanActivateFn, CanDeactivate, CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from '../authentication/login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isLoggedIn()  ) {

    if (state.url === '/login') {
      router.navigate(['user/homepage']);
      return false;
    }
    return true; 
  } else {
    if (state.url !== '/login') {
      router.navigate(['/login']);
      return false;
    }
    return true; 
  }
};


