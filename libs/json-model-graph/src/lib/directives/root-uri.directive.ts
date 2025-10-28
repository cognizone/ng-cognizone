import { ChangeDetectorRef, Directive, EmbeddedViewRef, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { JsonModel, Uri } from '@cognizone/json-model';

import { GraphWrapper, GraphWrapperFactory, NodeWrapper, UrisStoreService } from '../services';

@Directive({
  selector: '[czRootUri]',
  providers: [UrisStoreService],
  standalone: true,
})
export class RootUriDirective {
  @Input('czRootUri')
  set rootUri(uri: string) {
    this.urisStoreService.rootUri = uri;
    this.urisStoreService.nodeUri = uri;
    this.render(true);
  }

  get rootUri(): string {
    return this.urisStoreService.rootUri;
  }

  private currentView?: EmbeddedViewRef<unknown>;

  private graphWrapperFactory = inject(GraphWrapperFactory);
  private urisStoreService = inject(UrisStoreService);
  private viewContainer = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  private templateRef = inject(TemplateRef<unknown>, { optional: true });

  /**
   * @deprecated use `UrisStoreService::getWrapper` instead to the same effect
   */
  getWrapper(): GraphWrapper {
    return this.graphWrapperFactory.getWrapper(this.rootUri);
  }

  /**
   * @deprecated most likely used by no-one, will be removed at v4
   */
  getNodeWrapper<T extends JsonModel>(nodeUri: Uri<T>): NodeWrapper<T> {
    return this.graphWrapperFactory.getNodeWrapper(this.rootUri, nodeUri);
  }

  /**
   * Only works if the directive is used as as structural directive. Renders the given template if `rootUri` is given (much like `*ngIf`), clears the view otherwise.
   *
   * @param force if `true`, the current view will be cleared before being re-rendered. Usually used to force re-rendering of children components after a full graph reload.
   * @example `<ng-container *czRootUri="rootUri"><ng-container>`
   */
  render(force: boolean): void {
    if (!this.templateRef) return;
    if (this.currentView && force) {
      this.currentView = undefined;
      this.viewContainer.clear();
    }
    if (this.rootUri && !this.currentView) {
      this.currentView = this.viewContainer.createEmbeddedView(this.templateRef);
    }

    this.cdr.markForCheck();
  }
}
