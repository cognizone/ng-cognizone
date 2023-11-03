import { ChangeDetectorRef, Directive, EmbeddedViewRef, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';

import { UrisStoreService } from '../services';

@Directive({
  selector: '[czGraphForm]',
  providers: [UrisStoreService],
  standalone: true,
})
export class GraphFormDirective {
  @Input('czGraphForm')
  set graphUri(uri: string) {
    this.urisStoreService.graphUri = uri;
    this.urisStoreService.nodeUri = uri;
    this.render(true);
  }

  get graphUri(): string {
    return this.urisStoreService.graphUri;
  }

  private currentView?: EmbeddedViewRef<unknown>;

  constructor(
    private readonly urisStoreService: UrisStoreService,
    private readonly viewContainer: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    @Optional()
    private readonly templateRef?: TemplateRef<unknown>
  ) {}

  /**
   * Only works if the directive is used as as structural directive. Renders the given template if `rootUri` is given (much like `*ngIf`), clears the view otherwise.
   *
   * @param force if `true`, the current view will be cleared before being re-rendered. Usually used to force re-rendering of children components after a full graph reload.
   * @example `<ng-container *czFormRoot="rootUri"><ng-container>`
   */
  render(force: boolean): void {
    if (!this.templateRef) return;
    if (this.currentView && force) {
      this.currentView = undefined;
      this.viewContainer.clear();
    }
    if (this.graphUri && !this.currentView) {
      this.currentView = this.viewContainer.createEmbeddedView(this.templateRef);
    }

    this.cdr.markForCheck();
  }
}
