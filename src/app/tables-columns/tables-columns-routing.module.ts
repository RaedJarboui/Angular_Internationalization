import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesColumnsComponent } from './tables-columns.component';

const routes: Routes = [{ path: '', component: TablesColumnsComponent,children: [] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesColumnsRoutingModule { }
