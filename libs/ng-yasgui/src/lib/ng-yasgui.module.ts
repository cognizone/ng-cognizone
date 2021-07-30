import { NgModule } from '@angular/core';

import { YasguiComponent } from './components/yasgui/yasgui.component';
import { YasguiService } from './services/yasgui.service';

@NgModule({
  declarations: [YasguiComponent],
  imports: [],
  exports: [YasguiComponent],
  providers: [YasguiService],
})
export class NgYasguiModule {}
