import { ChangeDetectorRef, Directive, inject, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Directive({
  standalone: true,
})
export abstract class AbstractLoadDirective extends OnDestroy$ implements OnChanges {
  abstract loadingKey?: string;
  abstract else?: TemplateRef<unknown>;
  protected abstract type: 'loaded' | 'loading';

  private templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private loadingService: LoadingService = inject(LoadingService);
  private vcr: ViewContainerRef = inject(ViewContainerRef);

  ngOnChanges(): void {
    this.emptySink();

    this.subSink = this.loadingService
      .getLoading(this.loadingKey)
      .pipe(
        distinctUntilChanged(),
        map(loading => (this.type === 'loading' ? loading : !loading))
      )
      .subscribe(loadFlag => {
        this.vcr.clear();
        if (!loadFlag && this.else) this.vcr.createEmbeddedView(this.else);
        else if (loadFlag) this.vcr.createEmbeddedView(this.templateRef);
        this.cdr.markForCheck();
      });
  }
}
