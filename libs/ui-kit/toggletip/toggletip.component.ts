import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

let instanceId = 0;

@Component({
  selector: 'cz-toggletip',
  template: `
    <ng-template #tpl>
      <div [id]="dialogId" class="cz-toggletip-content" role="dialog" tabindex="-1">
        <button class="cz-toggletip-close" mat-icon-button (click)="toggletipClose.emit()">
          <mat-icon>close</mat-icon>
        </button>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styles: [
    `
      cz-toggletip {
        display: none;
      }

      .cz-toggletip-content {
        --bg-color: var(--cz-color-white);
        --font-size: 0.875rem;
        position: relative;
        max-width: 23rem;
        padding: 1.5rem;
        background-color: var(--bg-color);
        box-shadow: 0 2px 8px 0 rgba(40, 41, 61, 0.04), 0 16px 24px 0 rgba(96, 97, 112, 0.16);
        font-size: var(--font-size);

        .cz-toggletip-close {
          position: absolute;
          top: 4px;
          right: 4px;

          height: 24px;
          width: 24px;
          border-radius: 4px;
          .mat-button-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          mat-icon.mat-icon {
            font-size: 16px;
            width: 16px;
            height: 16px;
            line-height: 16px;
            color: var(--cz-font-color-high);
          }
        }

        &::after {
          top: 50%;
          transform: translate(0, -50%);
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
      }

      .is-left .cz-toggletip-content::after {
        right: 100%;
        border-right: 7px solid var(--bg-color);
        border-left: 5px solid transparent;
      }

      .is-right .cz-toggletip-content::after {
        left: 100%;
        border-left: 7px solid var(--bg-color);
        border-right: 5px solid transparent;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class ToggletipComponent {
  @ViewChild('tpl', { static: true })
  tpl!: TemplateRef<unknown>;

  dialogId = `cz-toggletip-${instanceId++}`;

  @Output()
  toggletipClose = new EventEmitter<void>();
}
