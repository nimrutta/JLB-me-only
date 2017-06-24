import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WazaziRoutingModule } from './wazazi-routing.module';
import { WazaziComponent } from './wazazi.component';

@NgModule({
  imports: [
    CommonModule,
    WazaziRoutingModule
  ],
  declarations: [WazaziComponent]
})
export class WazaziModule { }
