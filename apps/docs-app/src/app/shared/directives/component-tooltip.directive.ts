import { Overlay } from '@angular/cdk/overlay';
import { Directive, ElementRef, Inject, InjectionToken, Input, Optional, Type, ViewContainerRef } from '@angular/core';

import { AbstractTooltipDirective } from './abstract-tooltip.directive';

export const TOOLTIP_COMPONENT = new InjectionToken('TOOLTIP_COMPONENT');

export interface TooltipComponent {
  class: Type<unknown>;
  type: string;
}

@Directive({
  selector: '[appComponentTooltip]',
})
export class ComponentTooltipDirective extends AbstractTooltipDirective<unknown> {
  @Input()
  inputs?: {};

  @Input()
  appComponentTooltip!: string;

  get component(): Type<unknown> {
    const component = this.components.find(c => c.type === this.appComponentTooltip);
    if (component) return component.class;
    else throw new Error(`No tooltip component found for '${this.appComponentTooltip}'`);
  }

  constructor(
    overlay: Overlay,
    elRef: ElementRef,
    vcRef: ViewContainerRef,
    @Optional() @Inject(TOOLTIP_COMPONENT) private components: TooltipComponent[]
  ) {
    super(overlay, elRef, vcRef);
    if (!this.components) this.components = [];
  }

  protected linkInputs(instance: unknown): void {
    if (!this.inputs) return;
    Object.assign(instance as any, this.inputs);
  }
}
