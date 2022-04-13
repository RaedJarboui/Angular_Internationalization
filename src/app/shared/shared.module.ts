import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatAutocompleteModule} from '@angular/material/autocomplete';





@NgModule({

  imports: [
     CommonModule,
     FormsModule,
     NgxPaginationModule ,
    MatAutocompleteModule,
   
   ],
   declarations: [
   ],
   exports: [
     CommonModule,
     FormsModule,
     NgxPaginationModule , 
    MatAutocompleteModule,
   
   ]
 })
 export class SharedModule {
  
 }