import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesColumnsDataComponent } from './tables-columns-data.component';


const routes: Routes = [{ path: '', component: TablesColumnsDataComponent,children: [] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesColumnsDataRoutingModule { }
