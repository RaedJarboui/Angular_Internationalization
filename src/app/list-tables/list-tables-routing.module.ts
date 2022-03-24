import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTablesComponent } from './list-tables.component';

const routes: Routes = [{ path: '', component: ListTablesComponent,children: [] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTablesRoutingModule { }
