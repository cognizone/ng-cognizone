import { ChangeDetectorRef, Directive, EmbeddedViewRef, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Many, Nil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';

import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[czGetHasPermission]',
  standalone: true,
})
export class GetHasPermissionDirective extends OnDestroy$ implements OnInit {
  @Input('czGetHasPermission')
  permissions: Nil<Many<string>>;

  private ref?: EmbeddedViewRef<GetHasPermissionContext>;

  private permissionsService = inject(PermissionsService);
  private templateRef = inject(TemplateRef<GetHasPermissionContext>);
  private vcr = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.permissionsService
      .hasPermissions(this.permissions)
      .pipe(this.untilDestroyed())
      .subscribe(hasPermission => this.render(hasPermission));
  }

  private render(hasPermission: boolean): void {
    if (!this.ref) {
      this.vcr.clear();
      this.ref = this.vcr.createEmbeddedView(this.templateRef, { $implicit: hasPermission });
    } else {
      this.ref.context.$implicit = hasPermission;
    }
    this.cdr.markForCheck();
  }
}

export interface GetHasPermissionContext {
  $implicit: boolean;
}
