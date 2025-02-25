// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

interface JwtPayload {
  exp: number;
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const toastr= inject(ToastrService)

  let isRefreshing = false;
  const refreshTokenSubject = new BehaviorSubject<string | null>(null);

  if (req.url.includes('/api/Auth/login') || req.url.includes('/api/Auth/refresh')  || req.url.includes('/api/Auth/register')) {
    return next(req);
  }

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!accessToken) {
    let anonReqCount = parseInt(localStorage.getItem('anonReqCount') || '0', 10);
    anonReqCount++;
    localStorage.setItem('anonReqCount', anonReqCount.toString());
    if (anonReqCount >30) {
      toastr.error("يحب عليك تسجيل الدخول للاستخدام")
      authService.signOutExternal();
      return throwError(() => new Error('Anonymous request limit reached. Please log in.'));
    }
  } 

  const addToken = (request: HttpRequest<unknown>, token: string | null) => {
    return token 
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;
  };

  const isExpired = (token: string) => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return Date.now() >= exp * 10000;
    } catch {
      return true;
    }
  };

  const handle401 = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      if (!refreshToken) {
        authService.signOutExternal();
        return throwError(() => new Error('No refresh token'));
      }

      return authService.refreshToken(refreshToken).pipe(
        switchMap((response: any) => {
          console.log(response)
          isRefreshing = false;
          localStorage.setItem('accessToken', response.result.accessToken);
          localStorage.setItem('refreshToken', response.result.refreshToken);
          refreshTokenSubject.next(response.result.accessToken);
          return next(addToken(request, response.result.accessToken));
        }),
        catchError((error) => {
          isRefreshing = false;
          authService.signOutExternal();
          return throwError(() => error);
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next(addToken(request, token!)))
      );
    }
  };

  if (accessToken && !isExpired(accessToken)) {
    req = addToken(req, accessToken);
  }

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401(req, next);
      }
      return throwError(() => error);
    })
  );
};