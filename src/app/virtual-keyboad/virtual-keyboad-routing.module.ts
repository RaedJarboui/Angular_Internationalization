import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtualKeyboadComponent } from './virtual-keyboad.component';

const routes: Routes = [{ path: '', component: VirtualKeyboadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualKeyboadRoutingModule { }
