import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateUdfComponent } from './translate-udf.component';

const routes: Routes = [{ path: '', component: TranslateUdfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateUdfRoutingModule { }
