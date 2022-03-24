import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguesComponent } from './langues.component';

const routes: Routes = [{ path: '', component: LanguesComponent,children: [] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguesRoutingModule { }
