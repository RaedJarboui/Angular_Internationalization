import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { VariablesGlobales } from 'src/app/services/VariablesGlobales ';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  currentUser;
  selected_lang

  constructor(public translate: TranslateService,public globals: ThemeOptions,private router:Router,private authService: AuthService
    ,public variablesGlobales: VariablesGlobales) {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');

    console.log(browserLang);
 
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
  select(event){
    console.log("selected lang :",event)
    this.variablesGlobales.langue = event
    console.log("selected langue via service :",this.variablesGlobales.langue)

  }

}
