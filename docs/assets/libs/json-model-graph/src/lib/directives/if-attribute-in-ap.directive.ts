import { Attribute, ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ApHelper } from '@cognizone/ng-application-profile';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';

import { NodeUriDirective } from './node-uri.directive';

@Directive({
  selector: '[czIfAttributeInAp]'
})
export class IfAttributeInApDirective extends OnDestroy$ implements OnInit {
  @Input('czIfAttributeInAp')
  attributeKey!: string;

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly logger: Logger,
    private readonly cdr: ChangeDetectorRef,
    private readonly apHelper: ApHelper,
    private readonly nodeUriDirective: NodeUriDirective,
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
    const hasAttribute = this.apHelper.hasAttribute(this.nodeUriDirective.typeProfile, this.attributeKey);
    if (hasAttribute) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.logger.info(
        `Attribute '${this.attributeKey}' is not present in profile of class '${this.nodeUriDirective.typeProfile.classIds}', not rendering`
      );
      this.viewContainer.clear();
    }
    this.cdr.markForCheck();
  }
}
