import { NgModule } from '@angular/core';

import { IfDebugDirective } from './directives/if-debug.directive';

@NgModule({
  declarations: [IfDebugDirective],
  exports: [IfDebugDirective],
})
export class DevtoolsModule {}
