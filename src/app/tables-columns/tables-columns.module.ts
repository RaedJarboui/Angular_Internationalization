import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesColumnsRoutingModule } from './tables-columns-routing.module';
import { TablesColumnsComponent } from './tables-columns.component';


@NgModule({
  declarations: [TablesColumnsComponent],
  imports: [
    CommonModule,
    TablesColumnsRoutingModule
  ]
})
export class TablesColumnsModule { }
