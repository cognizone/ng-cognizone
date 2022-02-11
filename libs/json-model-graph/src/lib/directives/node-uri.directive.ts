import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';

import { GraphService } from '../services/graph.service';
import { RootUriDirective } from './root-uri.directive';

@Directive({
  selector: '[czNodeUri]',
})
export class NodeUriDirective extends OnDestroy$ {
  @Input('czNodeUri')
  get uri(): string {
    return this._uri;
  }

  set uri(value: string) {
    this._uri = value;
    this.onUriChange();
  }

  type!: string;

  private _uri!: string;

  constructor(
    private readonly rootUriDirective: RootUriDirective,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper<unknown>,
    private readonly graphService: GraphService
  ) {
    super();
  }

  onUriChange(): void {
    this.render(false);
    if (!this.uri) {
      return;
    }

    const node = this.graphService.getNodeSnapshot(this.rootUriDirective.rootUri, this.uri);
    this.type = this.dataModelDefinitionHelper.getConcreteType(this.rootUriDirective.getWrapper().getDefinition(), node['@type']);
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
