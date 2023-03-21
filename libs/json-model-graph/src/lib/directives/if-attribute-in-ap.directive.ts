import { Attribute, ChangeDetectorRef, Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from '@cognizone/json-model';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';

import { UrisStoreService } from '../services';

@Directive({
  selector: '[czIfAttributeInAp]',
})
export class IfAttributeInApDirective extends OnDestroy$ implements OnInit {
  @Input('czIfAttributeInAp')
  attributeKey!: string;

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly logger: Logger,
    private readonly cdr: ChangeDetectorRef,
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper,
    private readonly urisStoreService: UrisStoreService,
    @Attribute('formGroupName') private readonly formGroupName?: string,
    @Attribute('formControlName') private readonly formControlName?: string,
    @Attribute('formArrayName') private readonly formArrayName?: string
  ) {
    super();
    this.logger = logger.extend('IfAttributeInApDirective');
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
