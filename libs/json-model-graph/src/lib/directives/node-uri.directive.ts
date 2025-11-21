import { ChangeDetectorRef, Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';

import { GraphService, UrisStoreService } from '../services';

@Directive({
  selector: '[czNodeUri]',
  providers: [UrisStoreService],
  standalone: true,
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

  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  private dataModelDefinitionHelper = inject(DATA_MODEL_DEFINITION_HELPER_TOKEN);
  private graphService = inject(GraphService);
  private urisStoreService = inject(UrisStoreService);

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
