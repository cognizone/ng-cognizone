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
  styleUrls: ['./toggletip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class ToggletipComponent {
  @ViewChild('tpl', { static: true })
  tpl!: TemplateRef<unknown>;

  dialogId = `cz-toggletip-${instanceId++}`;

  @Output()
  toggletipClose = new EventEmitter<void>();
}
