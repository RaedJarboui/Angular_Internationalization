import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesColumnsRoutingModule } from './tables-columns-routing.module';
import { TablesColumnsComponent } from './tables-columns.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TablesColumnsComponent],
  imports: [
    CommonModule,
    TablesColumnsRoutingModule,
    SharedModule
  ]
})
export class TablesColumnsModule { }
