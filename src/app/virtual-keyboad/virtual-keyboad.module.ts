import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualKeyboadRoutingModule } from './virtual-keyboad-routing.module';
import { VirtualKeyboadComponent } from './virtual-keyboad.component';
import { SharedModule } from '../shared/shared.module';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [VirtualKeyboadComponent],
  imports: [
    CommonModule,
    VirtualKeyboadRoutingModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }),
  ]
})
export class VirtualKeyboadModule { }
