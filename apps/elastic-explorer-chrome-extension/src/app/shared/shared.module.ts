import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { CopyLinkButtonComponent } from './components/copy-link-button/copy-link-button.component';
import { EmptyComponent } from './components/empty/empty.component';

const components = [EmptyComponent, CopyLinkButtonComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, ClipboardModule],
})
export class SharedModule {}
