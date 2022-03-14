import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UrisStoreService } from '@cognizone/json-model-graph';
import { Dictionary, Many, manyToArray, SelectOption } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelper, ShaclHelperDefinition, ShaclOptionsService, ShPropertyShape } from '@cognizone/shacl/core';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'cz-attribute-field',
  templateUrl: './attribute-field.component.html',
  styleUrls: ['./attribute-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeFieldComponent extends OnDestroy$ implements OnInit {
  @Input()
  property!: ShPropertyShape;

  @Input()
  propertyKey!: string;

  @Input()
  control!: FormGroup | FormControl;

  @Input()
  showLabel: boolean = true;

  @Output()
  typeSet: EventEmitter<string> = new EventEmitter();

  type?: string;
  isRequired: boolean = false;
  tooltip!: string;

  langs: string[] = this.shaclOptionsService.getOptions().langStringLangs;

  get formControl(): FormControl {
    return this.control as FormControl;
  }
  get formGroup(): FormGroup {
    return this.control as FormGroup;
  }

  get label(): string {
    let label = this.property['sh:name'];
    if (this.isRequired) {
      label += '*';
    }

    return label ?? '';
  }

  options: SelectOption<string>[] = [];

  constructor(
    private urisStoreService: UrisStoreService,
    private shaclHelper: ShaclHelper,
    private shaclOptionsService: ShaclOptionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initType();
    const wrapper = this.urisStoreService.getWrapper();
    const nodeUri = this.urisStoreService.nodeUri;
    const type = wrapper.getNodeSnapshot(nodeUri)['@type'];
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;

    this.isRequired = this.shaclHelper.isRequired(definition, type, this.propertyKey);
    this.tooltip = this.property['sh:description'] ?? '';
  }

  private initType(): void {
    this.type = this.property['shacz:fieldType'];
    const expectedTypes = manyToArray(datatypeFieldTypeMapping[this.property['sh:datatype'] as string]);
    expectedTypes.push('text');
    if (this.type && !expectedTypes.includes(this.type)) {
      throw new Error(`datatype "${this.property['sh:datatype']}" cannot be used with fieldType "${this.type}"`);
    } else if (!this.type && this.property['shacz:option']) {
      this.type = 'select';
      this.options = this.property['shacz:option'].map(option => ({
        value: option['shacz:value'] as string,
        label: option['sh:label'] as string,
      }));
    } else if (!this.type) {
      this.type = expectedTypes[0];
    }

    if (this.type === 'number') {
      this.subSink = this.control.valueChanges
        .pipe(
          debounceTime(100), // TODO find a better way to fix this
          filter(value => typeof value === 'string')
        )
        .subscribe(value => {
          this.control.setValue(parseFloat(value));
        });
    }

    this.typeSet.emit(this.type);
  }
}

// TODO get this from config
const datatypeFieldTypeMapping: Dictionary<Many<string>> = {
  'rdf:langString': 'langString',
  'rdfs:Resource': ['textarea', 'select'],
  'xsd:integer': 'number',
  'xsd:int': 'number',
  'xsd:date': 'date',
  'xsd:boolean': 'bool',
  'xsd:string': ['textarea', 'text'],
};
