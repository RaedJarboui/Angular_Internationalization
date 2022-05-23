// import {Component, HostListener, OnInit} from '@angular/core';
// import {ThemeOptions} from '../../../theme-options';
// import {select} from '@angular-redux/store';
// import {Observable} from 'rxjs';
// import {ActivatedRoute} from '@angular/router';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
// })
// export class SidebarComponent implements OnInit {
//   public extraParameter: any;

//   constructor(public globals: ThemeOptions, private activatedRoute: ActivatedRoute) {

//   }

//   @select('config') public config$: Observable<any>;

//   private newInnerWidth: number;
//   private innerWidth: number;
//   activeId = 'dashboardsMenu';

//   toggleSidebar() {
//     this.globals.toggleSidebar = !this.globals.toggleSidebar;
//   }

//   sidebarHover() {
//     this.globals.sidebarHover = !this.globals.sidebarHover;
//   }

//   ngOnInit() {
//     setTimeout(() => {
//       this.innerWidth = window.innerWidth;
//       if (this.innerWidth < 1200) {
//         this.globals.toggleSidebar = true;
//       }
//     });

//     this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;

//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event) {
//     this.newInnerWidth = event.target.innerWidth;

//     if (this.newInnerWidth < 1200) {
//       this.globals.toggleSidebar = true;
//     } else {
//       this.globals.toggleSidebar = false;
//     }

//   }
// }




import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  /**
   *
   * @param globals ThemeOptions
   * @param activatedRoute ActivatedRoute
   * @param translate TranslateService
   */
  constructor(public globals: ThemeOptions, private activatedRoute: ActivatedRoute, public translate: TranslateService,
              private router: Router) {

  }

  @select('config') public config$: Observable<any>;
  private renewelLoanCondition = false;
  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
    this.globals.sidebarHover = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  sidebarHoverMouseOut() {
    this.globals.sidebarHover = false;
  }

  sidebarHoverMouseIn() {
    this.globals.sidebarHover = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }

 
 
}

