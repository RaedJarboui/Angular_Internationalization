import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';

import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AppComponent} from '../../../../../app.component';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from 'src/app/services/translation.service';
import { AuthService } from 'src/app/services/auth.service';
import { VariablesGlobales } from 'src/app/services/VariablesGlobales ';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  currentUser:any
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions,
              public translate: TranslateService, private router: Router,
              public translationService :TranslationService,
              public ngbDropdownMenu: NgbDropdownConfig,private authService: AuthService
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
    // this.user.groupes = [];
    // this.authentificationService.curentUser().subscribe(
    //   (data) => {
    //     this.user = data;
    //   }

    // );
    if (this.translate.currentLang === 'en') {
      this.ngbDropdownMenu.placement = 'bottom-right';
    } else if (this.translate.currentLang === 'fr') {
      this.ngbDropdownMenu.placement = 'bottom-right';
    } else if (this.translate.currentLang === 'ar') {
      this.ngbDropdownMenu.placement = 'bottom-left';
    }
  }

  logout() {
    // this.authentificationService.logout().subscribe();
    // this.loanSharedService.setHabilitationEntitys([]);
    // this.router.navigate([AcmConstants.LOGIN_URL]);
    this.authService.logOut();
    this.router.navigate(['/pages/login-boxed']);
  }

  langFR() {
    this.translate.use('fr');
    this.ngbDropdownMenu.placement = 'bottom-right';
    localStorage.setItem('lang', 'fr');
    
  }

  langEN() {
    this.translate.use('en');
    this.ngbDropdownMenu.placement = 'bottom-right';
    localStorage.setItem('lang', 'en');
  
  }

  langAR() {
    this.translate.use('ar');
    this.ngbDropdownMenu.placement = 'bottom-left';
    localStorage.setItem('lang', 'ar');
    
  }
    /**
     * changePwdComponent
     */
    changePwdComponent() {
  }
}
