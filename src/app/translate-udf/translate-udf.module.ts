import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateUdfRoutingModule } from './translate-udf-routing.module';
import { TranslateUdfComponent } from './translate-udf.component';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [TranslateUdfComponent],
  imports: [
    CommonModule,
    TranslateUdfRoutingModule,
    TableModule
  ]
})
export class TranslateUdfModule { }
