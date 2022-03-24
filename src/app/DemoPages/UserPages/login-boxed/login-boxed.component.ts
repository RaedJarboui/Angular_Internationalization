import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() {
    // if (this.authService.currentUserValue?.id) {
    //   this.router.navigate(['/']);
    // }

  }
  onSubmit() {
    console.log(this.form)
    console.log("hi")
    this.authService.login(this.form).subscribe(
      data => {
        console.log("heeeeeeeey")

        this.router.navigate(['/'])


      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        this.isLoginFailed = true;
      }
    );

  }

}
