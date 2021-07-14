import { Attribute, ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ApHelper } from '@cognizone/ng-application-profile';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';
import { snakeCase } from 'lodash-es';

import { NodeUriDirective } from './node-uri.directive';

@Directive({
  selector: '[czNodeAttribute]'
})
export class NodeAttributeDirective extends OnDestroy$ implements OnInit {
  // tslint:disable: no-input-rename because it's a structural directive
  @Input('czNodeAttributeAttributeKey')
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
    this.logger = logger.extend('NodeAttributeDirective');
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
    return `model.${snakeCase(this.nodeUriDirective.type)}.${snakeCase(this.attributeKey)}`;
  }

  private get existsInAp(): boolean {
    return this.apHelper.hasAttribute(this.nodeUriDirective.typeProfile, this.attributeKey);
  }

  private clear(): void {
    this.logger.info(`Attribute '${this.attributeKey}' not present in profile of class '${this.nodeUriDirective.type}', not rendering`);
    this.viewContainer.clear();
    this.cdr.markForCheck();
  }
}
