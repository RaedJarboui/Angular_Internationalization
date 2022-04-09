import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTablesRoutingModule } from './list-tables-routing.module';
import { ListTablesComponent } from './list-tables.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

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
