import { ChangeDetectorRef, Directive, EmbeddedViewRef, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { JsonModel, Uri } from '@cognizone/json-model';

import { UrisStoreService, GraphWrapper, GraphWrapperFactory, NodeWrapper } from '../services';

@Directive({
  selector: '[czRootUri]',
  providers: [UrisStoreService],
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

  constructor(
    private readonly graphWrapperFactory: GraphWrapperFactory,
    private readonly urisStoreService: UrisStoreService,
    private readonly viewContainer: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    @Optional()
    private readonly templateRef?: TemplateRef<unknown>
  ) {}

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
