import { ChangeDetectorRef, Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Many, Nil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';

import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[czIfHasPermission]',
  standalone: true,
})
export class IfHasPermissionDirective extends OnDestroy$ implements OnInit {
  @Input('czIfHasPermission')
  permissions: Nil<Many<string>>;

  private permissionsService = inject(PermissionsService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.permissionsService
      .hasPermissions(this.permissions)
      .pipe(this.untilDestroyed())
      .subscribe(hasPermission => this.render(hasPermission));
  }

  private render(shouldRender: boolean): void {
    this.viewContainer.clear();
    if (shouldRender) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    this.cdr.markForCheck();
  }
}
