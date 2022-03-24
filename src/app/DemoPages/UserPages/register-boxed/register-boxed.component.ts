import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-boxed',
  templateUrl: './register-boxed.component.html',
  styles: []
})
export class RegisterBoxedComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
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
    this.authService.register(this.form).subscribe(
      data => {

        this.router.navigate(['/pages/login-boxed'])

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
   }

}
