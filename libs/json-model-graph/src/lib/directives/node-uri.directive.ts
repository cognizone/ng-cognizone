import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ApHelper, ApplicationProfile, ApService, TypeProfile } from '@cognizone/ng-application-profile';
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

  ap!: ApplicationProfile;

  typeProfile!: TypeProfile;

  type!: string;

  private _uri!: string;

  private get apName(): string {
    return this.rootUriDirective.apName;
  }

  constructor(
    private readonly rootUriDirective: RootUriDirective,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly apService: ApService,
    private readonly apHelper: ApHelper,
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
    const ap = this.apService.getAp(this.apName);
    this.ap = ap;
    this.typeProfile = this.apHelper.getTypeProfile(ap, node['@type']);
    this.type = this.apHelper.getConcreteType(ap, node['@type']);
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
