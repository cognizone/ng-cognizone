import { AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { CdDefaultComponent } from '../cd-default/cd-default.component';

@Component({
  selector: 'app-cd-on-push',
  templateUrl: './cd-on-push.component.html',
  styleUrls: ['./cd-on-push.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdOnPushComponent extends CdDefaultComponent {}
