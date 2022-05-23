import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppComponent } from "../app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {TranslateModule} from '@ngx-translate/core';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from "@angular/common/http";
import {AngularSpinnerComponent} from '../angular-spinner/angular-spinner.component'






@NgModule({

  imports: [
     CommonModule,
     NgbModule,
     FormsModule,
     NgxPaginationModule ,
    MatAutocompleteModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatTooltipModule,
    MatIconModule,
    TableModule,
    PaginatorModule,
    


   ],
   declarations: [
    AngularSpinnerComponent
   ],
   exports: [
     CommonModule,
     FormsModule,
     NgxPaginationModule , 
    MatAutocompleteModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatTooltipModule,
    MatIconModule,
    TableModule,
    PaginatorModule,
    AngularSpinnerComponent
    

    
   ]
   ,bootstrap: [AppComponent]
 })
 export class SharedModule {
  
 }