import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShPropertyShape } from '@cognizone/shacl/core';

@Component({
  selector: 'cz-property-group-form',
  templateUrl: './property-group-form.component.html',
  styleUrls: ['./property-group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyGroupFormComponent {
  @Input()
  properties!: ShPropertyShape[];

  get title(): string | undefined {
    return this.properties[0]?.['sh:group']?.['sh:label']?.trim();
  }
}
