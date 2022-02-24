import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrefixCcService } from '@cognizone/json-model';
import { GraphAndControlLinkingService, UrisStoreService } from '@cognizone/json-model-graph';
import { manyToArray } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelper, ShaclHelperDefinition, ShPropertyShape } from '@cognizone/shacl/core';
import produce from 'immer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cz-property-field',
  templateUrl: './property-field.component.html',
  styleUrls: ['./property-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyFieldComponent extends OnDestroy$ implements OnInit {
  @Input()
  property!: ShPropertyShape;

  isReference!: boolean;
  isSingle!: boolean;
  nodeUris: string[] = [];
  propertyKey!: string;
  control!: FormControl;
  formArray!: FormArray;
  values$!: Observable<unknown[]>;

  get controls(): FormControl[] {
    return this.formArray.controls as FormControl[];
  }

  constructor(
    private urisStoreService: UrisStoreService,
    private shaclHelper: ShaclHelper,
    private prefixCcService: PrefixCcService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private graphControlService: GraphAndControlLinkingService,
    private controlContainer: ControlContainer
  ) {
    super();
  }

  ngOnInit(): void {
    const wrapper = this.urisStoreService.getWrapper();
    const nodeUri = this.urisStoreService.nodeUri;
    const type = wrapper.getNodeSnapshot(nodeUri)['@type'];
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;

    this.propertyKey = this.prefixCcService.convertUri(
      this.property['sh:path'] as string,
      definition.shapesGraph['@context'] ?? {},
      definition.modelContext
    );

    this.isSingle = this.shaclHelper.isSingle(definition, type, this.propertyKey);
    this.isReference = this.shaclHelper.isReference(definition, type, this.propertyKey);

    this.values$ = wrapper.getNode(nodeUri).pipe(
      map(node => node[this.propertyKey as keyof typeof node]),
      map(manyToArray)
    );
    if (this.isReference) return;
    let control: AbstractControl;
    if (this.isSingle) {
      this.control = this.fb.control(undefined);
      if (this.shaclHelper.isRequired(definition, type, this.propertyKey)) {
        this.control.addValidators(Validators.required);
      }
      control = this.control;
    } else {
      this.formArray = this.fb.array([]);
      control = this.formArray;
      this.subSink = this.graphControlService
        .updateFormArray(this.values$ as Observable<unknown[]>, this.formArray)
        .subscribe(() => this.cdr.markForCheck());
      this.subSink = this.graphControlService
        .linkControlToNodeAttribute({
          attributeKey: this.propertyKey as any,
          control: this.formArray,
          nodeUri,
          rootUri: wrapper.rootUri,
          definition,
        })
        .subscribe(() => this.cdr.markForCheck());
    }

    if (this.controlContainer.control instanceof FormGroup) {
      this.controlContainer.control.addControl(this.propertyKey, control);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.controlContainer.control instanceof FormGroup) {
      this.controlContainer.control.removeControl(this.propertyKey);
    }
  }

  addAttribute(): void {
    const wrapper = this.urisStoreService.getWrapper();
    const nodeUri = this.urisStoreService.nodeUri;

    const updatedNode = produce(wrapper.getNodeSnapshot(nodeUri), (draft: any) => {
      draft[this.propertyKey] = draft[this.propertyKey] ?? [];
      draft[this.propertyKey].push(undefined);
    });

    wrapper.update(updatedNode);
  }

  addReference(): void {
    const wrapper = this.urisStoreService.getWrapper();
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;

    const type = this.prefixCcService.convertUri(
      this.property['sh:class'] as string,
      definition.shapesGraph['@context'] ?? {},
      definition.modelContext
    );
    const updatedNodes = wrapper.addReference(
      wrapper.getNodeSnapshot(this.urisStoreService.nodeUri),
      this.propertyKey as any,
      undefined,
      type
    );
    wrapper.update(...updatedNodes);
  }

  removeReference(uri: string): void {
    const wrapper = this.urisStoreService.getWrapper();
    const nodeUri = this.urisStoreService.nodeUri;

    const updatedNode = produce(wrapper.getNodeSnapshot(nodeUri), (draft: any) => {
      draft[this.propertyKey] = draft[this.propertyKey].filter((value: string) => value !== uri);
    });

    wrapper.update(updatedNode);
  }
}
