// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login-boxed',
//   templateUrl: './login-boxed.component.html',
//   styles: []
// })
// export class LoginBoxedComponent implements OnInit {
//   form: any = {};
//   isLoggedIn = false;
//   isLoginFailed = false;
//   errorMessage = '';
//   currentUser: any;
//   constructor(private authService: AuthService,private router:Router) { }

//   ngOnInit() {


//   }
//   onSubmit() {
//     console.log(this.form)
//     console.log("hi")
//     this.authService.login(this.form).subscribe(
//       data => {
//         console.log("heeeeeeeey")
//         this.router.navigate(['/'])

//       },
//       err => {
//         this.errorMessage = err.error.message;
//         console.log(this.errorMessage)
//         this.isLoginFailed = true;
//       }
//     );

//   }

// }



import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {AppComponent} from '../../../app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})

export class LoginBoxedComponent implements OnInit {
  //   form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
//   errorMessage = '';
   currentUser: any;
 loginForm: FormGroup;
 error = '';

  @ViewChild('slickModal', {static: false}) slickModal: SlickCarouselComponent;
  slideConfig = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: false
  };


  /**
   * constructor
   * @param AuthentificationService authService
   * @param Router router
   * @param FormBuilder formBuilder
   * @param TranslateService translate
   * @param AcmDevToolsServices devToolsServices
   * @param SharedService loanSharedService
   * @param NgbModal modalService
   */
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              public translate: TranslateService,
              private modalService: NgbModal) {
  }

  /**
   * on init
   */
  ngOnInit() {
    this.createForm();

  }
  

  /**
   * create form validators
   */
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
        console.log("hi")
        var object ={username:this.loginForm.value.username,password:this.loginForm.value.password}
        this.authService.login(object).subscribe(
          data => {
            console.log("heeeeeeeey")
            this.router.navigate(['/'])
    
          },
          err => {
            this.error = err.error.message;
            console.log(this.error)
            this.isLoginFailed = true;
          }
        );
    

  }

  langFR() {
    this.translate.use('fr');
    this.slickModal.ngOnDestroy();
    localStorage.setItem('lang', 'fr');
  }

  /**
   * change language
   * FR
   */
  langEN() {
    this.translate.use('en');
    this.slickModal.ngOnDestroy();
    localStorage.setItem('lang', 'en');
  }

  /**
   * change language AR
   */
  langAR() {
    this.translate.use('ar');
    //AppComponent.direction = 'rtl';
    this.slickModal.ngOnDestroy();
    localStorage.setItem('lang', 'ar');
  }

 

   slickInit(e) {
    this.slideConfig.className = 'center';
    this.slideConfig.centerMode = true;
    this.slideConfig.infinite = true;
    this.slideConfig.centerPadding = '0';
    this.slideConfig.slidesToShow = 1;
    this.slideConfig.slidesToScroll = 1;
    this.slideConfig.speed = 500;
    this.slideConfig.dots = true;
    this.slideConfig.autoplay = true;
    this.slideConfig.autoplaySpeed = 3000;
    if (this.translate.currentLang === 'en') {
      this.slideConfig.rtl = false;
    } else if (this.translate.currentLang === 'fr') {
      this.slideConfig.rtl = false;
    } else if (this.translate.currentLang === 'ar') {
      this.slideConfig.rtl = true;
    }
    this.slickModal.config = this.slideConfig;
  }

 
 
 }

