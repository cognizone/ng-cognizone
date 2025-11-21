import { NgModule } from '@angular/core';

import { HighlightMatch } from './highlight-match.service';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
  declarations: [HighlightPipe],
  providers: [HighlightMatch],
  exports: [HighlightPipe],
})
export class HighlightModule {}
