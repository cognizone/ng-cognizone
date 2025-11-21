/* eslint-disable @angular-eslint/prefer-inject */
import { Attribute, ChangeDetectorRef, Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';
import { LoggerFactory, OnDestroy$ } from '@cognizone/ng-core';

import { UrisStoreService } from '../services';

@Directive({
  selector: '[czIfAttributeInAp]',
  standalone: true,
})
export class IfAttributeInApDirective extends OnDestroy$ implements OnInit {
  @Input('czIfAttributeInAp')
  attributeKey!: string;

  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  private dataModelDefinitionHelper = inject(DATA_MODEL_DEFINITION_HELPER_TOKEN);
  private urisStoreService = inject(UrisStoreService);
  private logger = inject(LoggerFactory).create('IfAttributeInApDirective');

  constructor(
    @Attribute('formGroupName') private readonly formGroupName?: string,
    @Attribute('formControlName') private readonly formControlName?: string,
    @Attribute('formArrayName') private readonly formArrayName?: string
  ) {
    super();
  }

  ngOnInit(): void {
    this.attributeKey = this.attributeKey ?? this.formControlName ?? this.formGroupName ?? this.formArrayName;
    this.renderIfExistsInAP();
  }

  private renderIfExistsInAP(): void {
    const hasAttribute = this.dataModelDefinitionHelper.hasProperty(
      this.urisStoreService.getWrapper().getDefinition(),
      this.urisStoreService.type,
      this.attributeKey
    );
    if (hasAttribute) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.logger.info(
        `Attribute '${this.attributeKey}' is not present in profile of class '${this.urisStoreService.type}', not rendering`
      );
      this.viewContainer.clear();
    }
    this.cdr.markForCheck();
  }
}
