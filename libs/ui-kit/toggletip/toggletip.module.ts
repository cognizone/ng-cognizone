import { NgModule } from '@angular/core';

import { ToggletipTriggerForDirective } from './toggletip-trigger-for.directive';
import { ToggletipComponent } from './toggletip.component';

@NgModule({
  imports: [ToggletipTriggerForDirective, ToggletipComponent],
  exports: [ToggletipTriggerForDirective, ToggletipComponent],
})
export class ToggletipModule {}
