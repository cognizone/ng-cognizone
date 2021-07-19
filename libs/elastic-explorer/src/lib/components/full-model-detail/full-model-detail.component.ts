import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FullModel } from '../../models/full-model';

@Component({
  selector: 'app-full-model-detail',
  templateUrl: './full-model-detail.component.html',
  styleUrls: ['./full-model-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullModelDetailComponent {
  @Input()
  model!: FullModel;
  queryControl: FormControl = new FormControl('');
}
