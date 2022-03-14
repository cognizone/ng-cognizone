import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonModel, PrefixCcService } from '@cognizone/json-model';
import { GraphAndControlLinkingService, UrisStoreService } from '@cognizone/json-model-graph';
import { manyToArray } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelper, ShaclHelperDefinition, ShaclOptionsService, ShPropertyShape } from '@cognizone/shacl/core';
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
  control!: FormControl | FormGroup;
  formArray!: FormArray;
  value?: any;
  minCount?: number;
  maxCount?: number;
  // TODO remove this and add fieldSize property?
  isLarge: boolean = false;

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
    private controlContainer: ControlContainer,
    private shaclOptionsService: ShaclOptionsService
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
    this.minCount = this.property['sh:minCount'];
    this.maxCount = this.property['sh:maxCount'];

    const value$ = wrapper.getNode(nodeUri).pipe(map(node => node[this.propertyKey as keyof typeof node])) as Observable<any>;
    this.subSink = value$.subscribe(values => {
      this.value = values;
      this.cdr.markForCheck();
    });

    if (this.isReference) return;

    let control: AbstractControl;
    if (this.isSingle) {
      if (this.shaclHelper.getTargetType(definition, type, this.propertyKey).includes('rdf:langString')) {
        this.control = this.generateLangStringFormGroup();
      } else {
        this.control = this.fb.control(undefined);
      }
      if (this.shaclHelper.isRequired(definition, type, this.propertyKey)) {
        this.control.addValidators(Validators.required);
      }
      control = this.control;
    } else {
      this.formArray = this.fb.array([]);
      control = this.formArray;
      this.subSink = this.graphControlService
        .updateFormArray(value$.pipe(map(manyToArray)), this.formArray)
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

  removeAttribute(index: number): void {
    const wrapper = this.urisStoreService.getWrapper();
    const nodeUri = this.urisStoreService.nodeUri;

    const updatedNode = produce(wrapper.getNodeSnapshot(nodeUri), (draft: any) => {
      if (Array.isArray(draft[this.propertyKey])) {
        draft[this.propertyKey].splice(index, 1);
      }
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
    let updatedNodes: JsonModel[];
    if (this.isSingle) {
      updatedNodes = wrapper.setReference(wrapper.getNodeSnapshot(this.urisStoreService.nodeUri), this.propertyKey as any, undefined, type);
    } else {
      updatedNodes = wrapper.addReference(wrapper.getNodeSnapshot(this.urisStoreService.nodeUri), this.propertyKey as any, undefined, type);
    }
    wrapper.update(...updatedNodes);
  }

  removeReference(uri: string): void {
    const wrapper = this.urisStoreService.getWrapper();
    const nodeUri = this.urisStoreService.nodeUri;

    const updatedNode = produce(wrapper.getNodeSnapshot(nodeUri), (draft: any) => {
      if (Array.isArray(draft[this.propertyKey])) {
        draft[this.propertyKey] = draft[this.propertyKey].filter((value: string) => value !== uri);
      } else {
        delete draft[this.propertyKey];
      }
    });

    wrapper.update(updatedNode);
  }

  onTypeSet(type: string): void {
    this.isLarge = ['textarea', 'langString'].includes(type);
  }

  private generateLangStringFormGroup(): FormGroup {
    const formDescriptor: { [lang: string]: FormArray } = {};
    this.shaclOptionsService.getOptions().langStringLangs.forEach(lang => (formDescriptor[lang] = this.fb.array([this.fb.control('')])));
    return this.fb.group(formDescriptor);
  }
}
