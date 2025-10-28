import { ChangeDetectorRef, Directive, EmbeddedViewRef, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';

import { UrisStoreService } from '../services';

@Directive({
  selector: '[czNodeForm]',
  providers: [UrisStoreService],
  standalone: true,
})
export class NodeFormDirective extends OnDestroy$ {
  @Input('czNodeForm')
  get nodeUri(): string {
    return this.urisStoreService.nodeUri;
  }

  set nodeUri(value: string) {
    this.urisStoreService.nodeUri = value;
    this.onUriChange();
  }

  private urisStoreService = inject(UrisStoreService);
  private viewContainer = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  private templateRef = inject(TemplateRef<unknown>);

  private viewRef?: EmbeddedViewRef<unknown>;

  onUriChange(): void {
    this.render(this.nodeUri != null);
  }

  private render(shouldRender: boolean): void {
    this.clear();
    if (shouldRender) {
      this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    }

    this.cdr.markForCheck();
  }

  private clear() {
    if (!this.viewRef) return;

    this.viewRef = undefined;
    this.viewContainer.clear();
  }
}
