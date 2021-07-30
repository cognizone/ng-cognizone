import { ChangeDetectorRef, Directive, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { Many, Nil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';

import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[czEnabledForPermission]',
})
export class EnabledForPermissionDirective extends OnDestroy$ implements OnInit, OnChanges {
  @HostBinding()
  disabled?: boolean;

  @Input('czEnabledForPermission')
  permissions: Nil<Many<string>>;

  @Input()
  czAnd?: boolean;

  @Input()
  czOr?: boolean;

  private hasPermission = false;

  constructor(private permissionsService: PermissionsService, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.permissionsService
      .hasPermissions(this.permissions)
      .pipe(this.untilDestroyed())
      .subscribe(hasPermission => {
        this.hasPermission = hasPermission;
        this.evaluate();
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(): void {
    this.evaluate();
  }

  private evaluate(): void {
    let enabled: boolean;
    if (this.czAnd != null) {
      enabled = this.hasPermission && this.czAnd;
    } else if (this.czOr != null) {
      enabled = this.hasPermission || this.czOr;
    } else {
      enabled = this.hasPermission;
    }
    this.disabled = !enabled;
  }
}
