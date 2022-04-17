import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualKeyboadRoutingModule } from './virtual-keyboad-routing.module';
import { VirtualKeyboadComponent } from './virtual-keyboad.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [VirtualKeyboadComponent],
  imports: [
    CommonModule,
    VirtualKeyboadRoutingModule,
    SharedModule
  ]
})
export class VirtualKeyboadModule { }
