import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
