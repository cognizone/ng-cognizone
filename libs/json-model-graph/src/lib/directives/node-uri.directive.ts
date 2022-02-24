import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';

import { GraphService, UrisStoreService } from '../services';

@Directive({
  selector: '[czNodeUri]',
  providers: [UrisStoreService],
})
export class NodeUriDirective extends OnDestroy$ {
  @Input('czNodeUri')
  get uri(): string {
    return this.urisStoreService.nodeUri;
  }

  set uri(value: string) {
    this.urisStoreService.nodeUri = value;
    this.onUriChange();
  }

  type!: string;

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper,
    private readonly graphService: GraphService,
    private urisStoreService: UrisStoreService
  ) {
    super();
  }

  onUriChange(): void {
    this.render(false);
    if (!this.uri) {
      return;
    }

    const node = this.graphService.getNodeSnapshot(this.urisStoreService.rootUri, this.uri);
    const wrapper = this.urisStoreService.getWrapper();
    this.type = this.dataModelDefinitionHelper.getConcreteType(wrapper.getDefinition(), node['@type']);
    this.render(true);
  }

  private render(shouldRender: boolean): void {
    if (shouldRender) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

    this.cdr.markForCheck();
  }
}
