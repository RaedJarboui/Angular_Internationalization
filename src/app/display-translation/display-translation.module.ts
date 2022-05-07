import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayTranslationRoutingModule } from './display-translation-routing.module';
import { DisplayTranslationComponent } from './display-translation.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DisplayTranslationComponent],
  imports: [
    CommonModule,
    DisplayTranslationRoutingModule,
    SharedModule
  ]
})
export class DisplayTranslationModule { }
