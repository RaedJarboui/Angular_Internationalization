import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    private currentUser: any;
  
    constructor(private authService: AuthService, private router: Router) {
      this.authService.currentUser.subscribe(data => {
        this.currentUser = data;
      });
    }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      if (this.currentUser) {
      
  
        return true;
      }else{
        this.router.navigate(['/pages/login-boxed']);
  
        return true;
      }
  
      
    }
  
  }