import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesColumnsDataRoutingModule } from './tables-columns-data-routing.module';
import { TablesColumnsDataComponent } from './tables-columns-data.component';


@NgModule({
  declarations: [TablesColumnsDataComponent],
  imports: [
    CommonModule,
    TablesColumnsDataRoutingModule
  ]
})
export class TablesColumnsDataModule { }
