import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShPropertyShape } from '@cognizone/shacl/core';

@Component({
  selector: 'cz-property-description',
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyDescriptionComponent {
  @Input()
  property!: ShPropertyShape;
}
