import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguesRoutingModule } from './langues-routing.module';
import { LanguesComponent } from './langues.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LanguesComponent],
  imports: [
    CommonModule,
    LanguesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LanguesModule { }
