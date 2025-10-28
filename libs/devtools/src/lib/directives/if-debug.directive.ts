import { Directive, inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { DEVTOOLS_ENABLED_TOKEN } from '../models/devtools-enabled.token';

@Directive({
  selector: '[czIfDebug]',
  standalone: true,
})
export class IfDebugDirective implements OnInit {
  private devtoolsEnabled = inject(DEVTOOLS_ENABLED_TOKEN);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
    if (this.devtoolsEnabled) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
