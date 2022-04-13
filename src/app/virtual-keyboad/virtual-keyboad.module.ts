import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualKeyboadRoutingModule } from './virtual-keyboad-routing.module';
import { VirtualKeyboadComponent } from './virtual-keyboad.component';


@NgModule({
  declarations: [VirtualKeyboadComponent],
  imports: [
    CommonModule,
    VirtualKeyboadRoutingModule
  ]
})
export class VirtualKeyboadModule { }
