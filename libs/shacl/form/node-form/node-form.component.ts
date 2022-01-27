import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { JsonModel } from '@cognizone/json-model';
import { GraphFormContextService } from '@cognizone/json-model-graph';
import { notNil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelper, ShaclHelperDefinition, ShPropertyGroup, ShPropertyShape } from '@cognizone/shacl/core';
import { groupBy } from 'lodash-es';
import { Observable } from 'rxjs';

@Component({
  selector: 'cz-node-form',
  templateUrl: './node-form.component.html',
  styleUrls: ['./node-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeFormComponent extends OnDestroy$ implements OnInit, OnDestroy {
  @Input()
  nodeUri!: string;

  @Input()
  canBeRemoved: boolean = false;

  @Output()
  remove: EventEmitter<void> = new EventEmitter();

  groups!: PropertyGroup[];

  formGroup = this.fb.group({});

  node$!: Observable<JsonModel>;
  shortTemplate?: string;
  type?: string;

  constructor(
    private graphFormContextService: GraphFormContextService,
    private shaclHelper: ShaclHelper,
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.controlContainer.control instanceof FormGroup) {
      this.controlContainer.control.addControl(this.nodeUri, this.formGroup);
    }
    const wrapper = this.graphFormContextService.getWrapper();
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;
    const type = wrapper.getNodeSnapshot(this.nodeUri)['@type'];
    const properties = this.shaclHelper.getProperties(definition, type).map(p => this.shaclHelper.getPropertyShape(definition, type, p));
    this.groups = Object.values(groupBy(properties, p => p?.['sh:group']?.['@id']))
      .map(properties => ({
        properties: properties.filter(notNil).sort((a, b) => (a['sh:order'] ?? -1) - (b['sh:order'] ?? -1)),
        group: properties[0]?.['sh:group'],
      }))
      .sort((a, b) => (a.group?.['sh:order'] ?? -1) - (b.group?.['sh:order'] ?? -1));

    const nodeShape = this.shaclHelper.getNodeShape(definition, type);
    this.shortTemplate = nodeShape['shacz:shortTemplate'];
    this.type = nodeShape['sh:targetClass'];

    this.node$ = wrapper.getNode(this.nodeUri);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.controlContainer.control instanceof FormGroup) {
      this.controlContainer.control.removeControl(this.nodeUri);
    }
  }
}

interface PropertyGroup {
  group?: ShPropertyGroup;
  properties: ShPropertyShape[];
}
