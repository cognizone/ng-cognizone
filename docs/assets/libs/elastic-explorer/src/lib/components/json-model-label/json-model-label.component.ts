import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonModel } from '@cognizone/ng-application-profile';

@Component({
  selector: 'app-json-model-label',
  templateUrl: './json-model-label.component.html',
  styleUrls: ['./json-model-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonModelLabelComponent<T extends JsonModel> {
  @Input()
  model!: T;
}
