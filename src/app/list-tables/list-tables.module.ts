import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTablesRoutingModule } from './list-tables-routing.module';
import { ListTablesComponent } from './list-tables.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import {AngularSpinnerComponent} from '../angular-spinner/angular-spinner.component'

@NgModule({
  declarations: [ListTablesComponent],
  imports: [
    CommonModule,
    ListTablesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ListTablesModule { }
