import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// This guard prevents authenticated users from accessing certain routes (e.g., login or register)
export const noAuthGuard: CanActivateFn = (route, state) => {
  // Injecting AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // If the user is already logged in, redirect them to /products
  if (authService.hasToken()) {
    router.navigate(['/products']);
    return false; // Block access to the route
  }

  return true; // Allow access if not authenticated
};
