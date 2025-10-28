/* eslint-disable @angular-eslint/prefer-inject */
import { Attribute, ChangeDetectorRef, Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';
import { LoggerFactory, OnDestroy$ } from '@cognizone/ng-core';
import { snakeCase } from 'lodash-es';

import { UrisStoreService } from '../services';

@Directive({
  selector: '[czNodeAttribute]',
  standalone: true,
})
export class NodeAttributeDirective extends OnDestroy$ implements OnInit {
  @Input('czNodeAttributeAttributeKey')
  attributeKey!: string;

  private logger = inject(LoggerFactory).create('NodeAttributeDirective');
  private dataModelDefinitionHelper = inject(DATA_MODEL_DEFINITION_HELPER_TOKEN);
  private urisStoreService = inject(UrisStoreService);
  private cdr = inject(ChangeDetectorRef);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);

  constructor(
    @Attribute('formGroupName') private readonly formGroupName?: string,
    @Attribute('formControlName') private readonly formControlName?: string,
    @Attribute('formArrayName') private readonly formArrayName?: string
  ) {
    super();
  }

  ngOnInit(): void {
    this.attributeKey = this.attributeKey ?? this.formControlName ?? this.formGroupName ?? this.formArrayName;
    if (!this.existsInAp) {
      this.clear();
      return;
    }

    this.render();
  }

  private render(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: this.label });
  }

  private get label(): string {
    return `model.${snakeCase(this.urisStoreService.type)}.${snakeCase(this.attributeKey)}`;
  }

  private get existsInAp(): boolean {
    const wrapper = this.urisStoreService.getWrapper();
    return this.dataModelDefinitionHelper.hasProperty(wrapper.getDefinition(), this.urisStoreService.type, this.attributeKey);
  }

  private clear(): void {
    this.logger.info(`Attribute '${this.attributeKey}' not present in profile of class '${this.urisStoreService.type}', not rendering`);
    this.viewContainer.clear();
    this.cdr.markForCheck();
  }
}
