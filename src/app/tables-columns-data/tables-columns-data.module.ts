import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesColumnsDataRoutingModule } from './tables-columns-data-routing.module';
import { TablesColumnsDataComponent } from './tables-columns-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [TablesColumnsDataComponent],
  imports: [
    CommonModule,
    TablesColumnsDataRoutingModule,
    SharedModule,
    MatAutocompleteModule

    //  FormsModule,
    //   ReactiveFormsModule
  ],
  exports: [CommonModule]
})
export class TablesColumnsDataModule { }
