import { HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';


const HEADER_AUTHORIZATION = "authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  currentUser;
  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    if (request.headers.has(HEADER_AUTHORIZATION)) {

      this.authService.currentUser.subscribe(data => {
        this.currentUser = data;
        console.log( this.currentUser.token)
     


      authReq = request.clone({ headers: request.headers.set(HEADER_AUTHORIZATION, 'Bearer ' + this.currentUser.accessToken) });
    });
    } 
    return next.handle(request);

  }

  
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];