import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
import { UrisStoreService } from '@cognizone/json-model-graph';
import { notNil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelper, ShaclHelperDefinition, ShPropertyGroup, ShPropertyShape } from '@cognizone/shacl/core';
import { groupBy } from 'lodash-es';

@Component({
  selector: 'cz-node-form',
  templateUrl: './node-form.component.html',
  styleUrls: ['./node-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeFormComponent extends OnDestroy$ implements OnInit, OnDestroy {
  @Input()
  nodeUri!: string;

  groups!: PropertyGroup[];

  formGroup = this.fb.group({});

  constructor(
    private urisStoreService: UrisStoreService,
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
    const wrapper = this.urisStoreService.getWrapper();
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;
    const type = wrapper.getNodeSnapshot(this.nodeUri)['@type'];
    const properties = this.shaclHelper.getProperties(definition, type).map(p => this.shaclHelper.getPropertyShape(definition, type, p));
    const getOrder = (x: ShPropertyShape | ShPropertyGroup | undefined) => {
      if (!x) return Number.NEGATIVE_INFINITY;
      const order = x['sh:order'];
      if (!order) return Number.POSITIVE_INFINITY;
      if (typeof order === 'string') return parseInt(order);
      return order;
    };
    this.groups = Object.values(groupBy(properties, p => p?.['sh:group']?.['@id']))
      .map(properties => ({
        properties: properties
          .filter(notNil)
          .filter(p => !p['sh:deactivated'])
          .sort((a, b) => getOrder(a) - getOrder(b)),
        group: properties[0]?.['sh:group'],
      }))
      .sort((a, b) => getOrder(a.group) - getOrder(b.group));
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
