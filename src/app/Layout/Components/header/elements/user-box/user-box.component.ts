import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  currentUser;

  constructor(public globals: ThemeOptions,private router:Router,private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser)
    });
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/pages/login-boxed']);
  }

}
