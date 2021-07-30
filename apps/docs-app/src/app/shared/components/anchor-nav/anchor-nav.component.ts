import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Maybe, OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { Anchor } from '../../models/anchor';
import { AnchorService } from '../../services/anchor.service';

@Component({
  selector: 'app-anchor-nav',
  templateUrl: './anchor-nav.component.html',
  styleUrls: ['./anchor-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorNavComponent extends OnDestroy$ implements OnInit {
  anchors$: Observable<Anchor[]> = this.anchorService.anchors$;

  activeAnchor: Maybe<Anchor>;

  constructor(
    private readonly anchorService: AnchorService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {
    super();
  }

  ngOnInit(): void {
    // Since the scroll event used inside is fired frequently, we opt out of the angular zone to prevent too much change detection everywhere else in the app whenever we scroll
    this.zone.runOutsideAngular(() => {
      this.anchorService.activeAnchor$
        .pipe(
          distinctUntilChanged(),
          tap(a => (this.activeAnchor = a)),
          this.untilDestroyed()
        )
        .subscribe(() => this.zone.run(() => this.cdr.markForCheck()));
    });
  }

  async scrollTo(event: Event, anchor: Anchor): Promise<void> {
    event.preventDefault();
    await this.router.navigate(['.'], { fragment: anchor.id, relativeTo: anchor.route });
  }

  isActive(anchor: Anchor): boolean {
    return anchor === this.activeAnchor;
  }
}
