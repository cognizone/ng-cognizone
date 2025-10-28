import { ChangeDetectorRef, Directive, inject, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';

import { FeatureFlagService } from './feature-flag.service';

/**
 * @example ```html
 * <div *czIfFlagEnabled="'my-flag'">I'm visible if my-flag is enabled in FeatureFlagService</div>
 * ```
 */
@Directive({
  selector: '[czIfFlagEnabled]',
  standalone: true,
})
export class IfFlagEnabledDirective extends OnDestroy$ implements OnChanges {
  @Input('czIfFlagEnabled')
  feature?: string;

  private lastEnabled?: boolean;

  private templateRef = inject(TemplateRef<unknown>);
  private cdr = inject(ChangeDetectorRef);
  private featureFlagService = inject(FeatureFlagService);
  private vcr = inject(ViewContainerRef);

  ngOnChanges(): void {
    const enabled = this.feature ? this.featureFlagService.isFeatureEnabled(this.feature) : false;
    if (enabled === this.lastEnabled) return;

    this.vcr.clear();
    if (enabled) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
    this.cdr.markForCheck();
  }
}
