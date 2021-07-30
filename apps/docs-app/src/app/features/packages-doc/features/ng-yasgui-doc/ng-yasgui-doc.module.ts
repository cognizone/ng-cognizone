import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { NgYasguiModule } from '@cognizone/ng-yasgui';

import { NgYasguiDocRoutingModule } from './ng-yasgui-doc-routing.module';
import { NgYasguiDocComponent } from './ng-yasgui-doc.component';

@NgModule({
  declarations: [NgYasguiDocComponent],
  imports: [CommonModule, SharedModule, NgYasguiModule, NgYasguiDocRoutingModule],
})
export class NgYasguiDocModule {}
