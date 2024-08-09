import { AfterViewInit, Directive } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appMatTabRouted]',
})
export class MatTabRoutedDirective extends OnDestroy$ implements AfterViewInit {
  private tabRouteParamKey = 'tab';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tabGroup: MatTabGroup,
    private readonly logger: Logger
  ) {
    super();
    this.logger = logger.extend('MatTabRoutedDirective');
  }

  ngAfterViewInit(): void {
    this.route.queryParams
      .pipe(
        map(p => (p[this.tabRouteParamKey] ? (p[this.tabRouteParamKey] as string) : this.tabGroup._tabs.first.textLabel)),
        map(textLabel => this.tabGroup._tabs.toArray().findIndex(tab => tab.textLabel === textLabel)),
        this.untilDestroyed()
      )
      .subscribe(index => (this.tabGroup.selectedIndex = index));

    this.tabGroup.selectedIndexChange.pipe(this.untilDestroyed()).subscribe(tabLabel => this.goToTab(tabLabel));
    if (!this.route.snapshot.queryParams[this.tabRouteParamKey]) this.goToTab(0);
  }

  private goToTab(tab: number | string): void {
    if (typeof tab === 'number') {
      tab = this.tabGroup._tabs.toArray()[tab].textLabel;
    }
    this.router
      .navigate(['.'], { relativeTo: this.route, queryParams: { [this.tabRouteParamKey]: tab } })
      .catch(err => this.logger.error(err));
  }
}
