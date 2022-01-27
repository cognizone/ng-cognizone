import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';

import { GraphFormContextService } from '../services';
import { GraphService } from '../services/graph.service';

@Directive({
  selector: '[czNodeUri]',
  providers: [GraphFormContextService],
})
export class NodeUriDirective extends OnDestroy$ {
  @Input('czNodeUri')
  get uri(): string {
    return this.graphFormContextService.nodeUri;
  }

  set uri(value: string) {
    this.graphFormContextService.nodeUri = value;
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
    private graphFormContextService: GraphFormContextService
  ) {
    super();
  }

  onUriChange(): void {
    this.render(false);
    if (!this.uri) {
      return;
    }

    const node = this.graphService.getNodeSnapshot(this.graphFormContextService.rootUri, this.uri);
    const wrapper = this.graphFormContextService.getWrapper();
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
