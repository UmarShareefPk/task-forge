import { HttpInterceptorFn, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

// Per-request opt-out token (use in calls you want to skip)
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  // Skip via context
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  // Or skip by URL
  const excluded = ['/auth/login', '/auth/refresh'];
  if (excluded.some(u => req.url.includes(u))) {
    return next(req);
  }

  const token = auth.getToken(); 
  
if (token && auth.isTokenExpired(token)) {
  auth.logout();
  router.navigate(['/login']);
  return EMPTY; // cancel request
}

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth.logout();              // clear storage, etc.
        router.navigate(['/login']); // send user to login
      }
      return throwError(() => err);
    })
  );
};
