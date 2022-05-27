import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayTranslationRoutingModule } from './display-translation-routing.module';
import { DisplayTranslationComponent } from './display-translation.component';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from '../shared/shared.module';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';

@NgModule({
  declarations: [DisplayTranslationComponent],
  imports: [
    CommonModule,
    DisplayTranslationRoutingModule,
    SharedModule,
    MatRadioModule,
    NgxHijriGregorianDatepickerModule
  ]
})
export class DisplayTranslationModule { }
