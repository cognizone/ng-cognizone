import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { NgCoreDocRoutingModule } from './ng-core-doc-routing.module';
import { LoggerDocComponent } from './views/logger-doc/logger-doc.component';
import { OnDestroyMixinDocComponent } from './views/on-destroy-mixin-doc/on-destroy-mixin-doc.component';

@NgModule({
  declarations: [OnDestroyMixinDocComponent, LoggerDocComponent],
  imports: [CommonModule, NgCoreDocRoutingModule, SharedModule],
})
export class NgCoreDocModule {}
