import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProtocolService } from '@czde-ce/core';

@Component({
  selector: 'app-copy-link-button',
  template: `
    <button
      mat-mini-fab
      color="primary"
      aria-label="Copy shareable link to current page"
      matTooltip="Copy shareable link to current page"
      [cdkCopyToClipboard]="link"
    >
      <mat-icon>link</mat-icon>
    </button>
  `,
  styles: [
    `
      :host {
        z-index: 100000;
        position: fixed;
        bottom: 24px;
        right: 24px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyLinkButtonComponent {
  constructor(private protocolService: ProtocolService) {}

  get link(): string {
    const base = `${this.protocolService.protocol}://`;
    const path = location.href.split('#/')[1];
    return `${base}${path}`;
  }
}