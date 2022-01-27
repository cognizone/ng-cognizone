import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GraphFormContextService } from '@cognizone/json-model-graph';
import { ShaclHelper, ShaclHelperDefinition, ShPropertyShape } from '@cognizone/shacl/core';

@Component({
  selector: 'cz-attribute-field',
  templateUrl: './attribute-field.component.html',
  styleUrls: ['./attribute-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeFieldComponent implements OnInit {
  @Input()
  property!: ShPropertyShape;

  @Input()
  propertyKey!: string;

  @Input()
  control!: FormControl;

  @Input()
  showLabel: boolean = true;

  type?: string;
  isRequired: boolean = false;

  get label(): string {
    let label = this.property['sh:name'];
    if (this.isRequired) {
      label += '*';
    }

    return label ?? '';
  }

  constructor(private graphFormContextService: GraphFormContextService, private shaclHelper: ShaclHelper) {}

  ngOnInit(): void {
    this.initType();
    const wrapper = this.graphFormContextService.getWrapper();
    const nodeUri = this.graphFormContextService.nodeUri;
    const type = wrapper.getNodeSnapshot(nodeUri)['@type'];
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;

    this.isRequired = this.shaclHelper.isRequired(definition, type, this.propertyKey);
  }

  private initType(): void {
    switch (this.property['sh:datatype']) {
      case 'xsd:int':
        this.type = 'number';
        break;
      case 'xsd:date':
        this.type = 'date';
        break;
      case 'xsd:boolean':
        this.type = 'bool';
        break;
      default:
        this.type = 'text';
    }
  }
}
