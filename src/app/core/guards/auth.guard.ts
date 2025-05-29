import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// This guard protects routes and ensures that only authenticated users can access them
export const authGuard: CanActivateFn = () => {
  // Injecting the AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user has a valid token (is logged in)
  if (authService.hasToken()) {
    return true; // Allow access to the route
  } else {
    router.navigate(['/login']); // Redirect to login page if not authenticated
    return false; // Block access to the route
  }
};
