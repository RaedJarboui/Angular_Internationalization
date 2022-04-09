import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguesRoutingModule } from './langues-routing.module';
import { LanguesComponent } from './langues.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [LanguesComponent],
  imports: [
    CommonModule,
    LanguesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule
  ]
})
export class LanguesModule { }
