import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayTranslationComponent } from './display-translation.component';

const routes: Routes = [{ path: '', component: DisplayTranslationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayTranslationRoutingModule { }
