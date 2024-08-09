import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CopyLinkButtonComponent } from './components/copy-link-button/copy-link-button.component';
import { EmptyComponent } from './components/empty/empty.component';

const components = [EmptyComponent, CopyLinkButtonComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, ClipboardModule],
})
export class SharedModule {}
