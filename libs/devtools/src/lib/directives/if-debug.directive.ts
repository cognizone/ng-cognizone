import { Directive, Inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { DEVTOOLS_ENABLED_TOKEN } from '../models/devtools-enabled.token';

@Directive({
  selector: '[czIfDebug]',
})
export class IfDebugDirective implements OnInit {
  constructor(
    @Inject(DEVTOOLS_ENABLED_TOKEN) private devtoolsEnabled: boolean,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.devtoolsEnabled) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
