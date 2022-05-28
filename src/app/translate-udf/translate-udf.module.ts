import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateUdfRoutingModule } from './translate-udf-routing.module';
import { TranslateUdfComponent } from './translate-udf.component';
import {TableModule} from 'primeng/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [TranslateUdfComponent],
  imports: [
    CommonModule,
    TranslateUdfRoutingModule,
    TableModule,
    MatAutocompleteModule
  ]
})
export class TranslateUdfModule { }
